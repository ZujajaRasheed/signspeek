# import cv2 as cv
# import mediapipe as mp
# import numpy as np
# import json
# import tensorflow as tf

# # --- SETTINGS ---
# TFLITE_MODEL_PATH = "models/sign_model.tflite" 
# LABELS_PATH = "models/labels.json"
# SEQUENCE_LENGTH = 50 
# THRESHOLD = 0.75  # Minimum confidence to show a sign
# MOVEMENT_THRESHOLD = 0.005 # To detect if hands are actually moving

# # --- INITIALIZE ---
# mp_holistic = mp.solutions.holistic
# holistic = mp_holistic.Holistic(min_detection_confidence=0.7, min_tracking_confidence=0.7)

# interpreter = tf.lite.Interpreter(model_path=TFLITE_MODEL_PATH)
# interpreter.allocate_tensors()
# input_details = interpreter.get_input_details()
# output_details = interpreter.get_output_details()

# with open(LABELS_PATH, 'r') as f:
#     labels_data = json.load(f)
#     # Ensure keys are strings for matching
#     labels_dict = {str(k): v for k, v in labels_data.items()}

# # State Variables
# sequence = []
# current_prediction = "Waiting..."
# prediction_history = []

# def extract_pose(result):
#     if result.pose_landmarks:
#         pose_lm = np.array([[lm.x, lm.y, lm.z, lm.visibility] for lm in result.pose_landmarks.landmark])
#         left_sh, right_sh = pose_lm[11, :3], pose_lm[12, :3]
#         center = (left_sh + right_sh) / 2
#         scale = np.linalg.norm(left_sh - right_sh) + 1e-6
#         pose_lm[:, :3] = (pose_lm[:, :3] - center) / scale
#         return pose_lm.flatten().tolist(), center, scale
#     return [0.0] * 132, np.array([0.5, 0.5, 0]), 1.0

# def extract_hand(hand_lm, center, scale):
#     if hand_lm:
#         hand = np.array([[lm.x, lm.y, lm.z] for lm in hand_lm.landmark])
#         return ((hand - center) / scale).flatten().tolist()
#     return [0.0] * 63

# def is_hand_moving(sequence):
#     # Calculate variance in hand landmarks across the sequence
#     # If variance is too low, the person is just holding their hands still (Idle)
#     recent_sequence = np.array(sequence[-10:]) # check last 10 frames
#     hand_features = recent_sequence[:, 132:] # only hand landmarks
#     variance = np.var(hand_features)
#     return variance > MOVEMENT_THRESHOLD

# cap = cv.VideoCapture(0)

# while cap.isOpened():
#     ret, frame = cap.read()
#     if not ret: break

#     # 1. FLIP CAMERA
#     frame = cv.flip(frame, 1)

#     image = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
#     results = holistic.process(image)
#     image = cv.cvtColor(image, cv.COLOR_RGB2BGR)

#     # CHECK: Hands visibility
#     lh_visible = results.left_hand_landmarks
#     rh_visible = results.right_hand_landmarks

#     pose, center, scale = extract_pose(results)
#     rh = extract_hand(rh_visible, center, scale)
#     lh = extract_hand(lh_visible, center, scale)
    
#     sequence.append(pose + rh + lh)
#     sequence = sequence[-SEQUENCE_LENGTH:] 

#     if len(sequence) == SEQUENCE_LENGTH:
#         # Check if hands are present and moving
#         if (lh_visible or rh_visible) and is_hand_moving(sequence):
            
#             # PREPROCESSING (Match your training: normalize then /100)
#             input_data = np.expand_dims(sequence, axis=0).astype(np.float32)
#             input_data = input_data / 100.0  # THIS IS THE CRITICAL LINE
            
#             interpreter.set_tensor(input_details[0]['index'], input_data)
#             interpreter.invoke()
#             res = interpreter.get_tensor(output_details[0]['index'])[0]
            
#             idx = np.argmax(res)
#             confidence = res[idx]
            
#             if confidence > THRESHOLD:
#                 pred_word = labels_dict.get(str(idx), "Unknown")
#                 current_prediction = f"{pred_word} ({int(confidence*100)}%)"
#             else:
#                 current_prediction = "Sign Not Detected / Repeat Sign"
#         else:
#             current_prediction = "Idle (No Sign)"

#     # --- UI ---
#     # Top bar for prediction
#     cv.rectangle(image, (0,0), (640, 50), (20, 20, 20), -1)
#     color = (0, 255, 0) if "Idle" not in current_prediction else (0, 0, 255)
#     cv.putText(image, current_prediction, (20, 35), 
#                cv.FONT_HERSHEY_SIMPLEX, 1, color, 2, cv.LINE_AA)

#     cv.imshow('SignSpeek Real-Time', image)

#     if cv.waitKey(1) & 0xFF == ord('q'):
#         break

# cap.release()
# cv.destroyAllWindows()










































# import cv2 as cv
# import mediapipe as mp
# import numpy as np
# import json
# import tensorflow as tf

# # ==============================
# # SETTINGS
# # ==============================
# TFLITE_MODEL_PATH = "models/sign_model.tflite"
# LABELS_PATH = "models/labels.json"

# SEQUENCE_LENGTH = 50
# THRESHOLD = 0.75
# MOVEMENT_THRESHOLD = 0.001   # 🔥 LOWERED (IMPORTANT)
# COOLDOWN_FRAMES = 20

# # ==============================
# # INITIALIZE
# # ==============================
# mp_holistic = mp.solutions.holistic
# holistic = mp_holistic.Holistic(
#     min_detection_confidence=0.7,
#     min_tracking_confidence=0.7
# )

# interpreter = tf.lite.Interpreter(model_path=TFLITE_MODEL_PATH)
# interpreter.allocate_tensors()
# input_details = interpreter.get_input_details()
# output_details = interpreter.get_output_details()

# with open(LABELS_PATH, 'r') as f:
#     labels_data = json.load(f)
#     labels_dict = {str(k): v for k, v in labels_data.items()}

# # ==============================
# # STATE VARIABLES
# # ==============================
# sequence = []
# current_prediction = "Waiting..."
# sign_active = False
# cooldown = 0

# # ==============================
# # FEATURE EXTRACTION
# # ==============================
# def extract_pose(result):
#     if result.pose_landmarks:
#         pose_lm = np.array([[lm.x, lm.y, lm.z, lm.visibility]
#                             for lm in result.pose_landmarks.landmark])

#         left_sh, right_sh = pose_lm[11, :3], pose_lm[12, :3]
#         center = (left_sh + right_sh) / 2
#         scale = np.linalg.norm(left_sh - right_sh) + 1e-6

#         pose_lm[:, :3] = (pose_lm[:, :3] - center) / scale
#         return pose_lm.flatten(), center, scale

#     return np.zeros(132), np.array([0.5, 0.5, 0]), 1.0


# def extract_hand(hand_lm, center, scale):
#     if hand_lm:
#         hand = np.array([[lm.x, lm.y, lm.z] for lm in hand_lm.landmark])
#         hand = (hand - center) / scale
#         return hand.flatten()
#     return np.zeros(63)


# def is_hand_moving(sequence):
#     if len(sequence) < 10:
#         return False

#     recent = np.array(sequence[-10:])
#     hand_data = recent[:, 132:]
#     variance = np.var(hand_data)

#     return variance > MOVEMENT_THRESHOLD   # 🔥 FIXED (no upper limit)


# # ==============================
# # REAL-TIME LOOP
# # ==============================
# cap = cv.VideoCapture(0)

# while cap.isOpened():
#     ret, frame = cap.read()
#     if not ret:
#         break

#     frame = cv.flip(frame, 1)

#     image = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
#     results = holistic.process(image)
#     image = cv.cvtColor(image, cv.COLOR_RGB2BGR)

#     lh_visible = results.left_hand_landmarks
#     rh_visible = results.right_hand_landmarks

#     pose, center, scale = extract_pose(results)
#     rh = extract_hand(rh_visible, center, scale)
#     lh = extract_hand(lh_visible, center, scale)

#     features = np.concatenate([pose, rh, lh])

#     # ==============================
#     # ALWAYS COLLECT FRAMES (CRITICAL FIX)
#     # ==============================
#     sequence.append(features)
#     sequence = sequence[-SEQUENCE_LENGTH:]

#     # ==============================
#     # COOLDOWN
#     # ==============================
#     if cooldown > 0:
#         cooldown -= 1

#     # ==============================
#     # MOVEMENT DETECTION
#     # ==============================
#     if (lh_visible or rh_visible) and is_hand_moving(sequence):
#         sign_active = True

#     # ==============================
#     # PREDICT WHEN MOVEMENT STOPS
#     # ==============================
#     elif sign_active and cooldown == 0:
#         if len(sequence) == SEQUENCE_LENGTH:

#             input_data = np.expand_dims(sequence, axis=0).astype(np.float32)

#             # ⚠️ KEEP ONLY IF USED IN TRAINING
#             input_data = input_data / 100.0

#             interpreter.set_tensor(input_details[0]['index'], input_data)
#             interpreter.invoke()
#             res = interpreter.get_tensor(output_details[0]['index'])[0]

#             idx = np.argmax(res)
#             confidence = res[idx]

#             if confidence > THRESHOLD:
#                 pred_word = labels_dict.get(str(idx), "Unknown")
#                 current_prediction = f"{pred_word} ({int(confidence*100)}%)"
#             else:
#                 current_prediction = "Repeat Sign"

#         # RESET
#         sign_active = False
#         cooldown = COOLDOWN_FRAMES

#     # ==============================
#     # DEFAULT STATE
#     # ==============================
#     elif cooldown == 0:
#         current_prediction = "Waiting..."

#     # ==============================
#     # UI
#     # ==============================
#     cv.rectangle(image, (0, 0), (640, 50), (20, 20, 20), -1)

#     color = (0, 255, 0) if "Repeat" not in current_prediction else (0, 0, 255)

#     cv.putText(
#         image,
#         current_prediction,
#         (20, 35),
#         cv.FONT_HERSHEY_SIMPLEX,
#         1,
#         color,
#         2,
#         cv.LINE_AA
#     )

#     cv.imshow('SignSpeek Real-Time', image)

#     if cv.waitKey(1) & 0xFF == ord('q'):
#         break

# cap.release()
# cv.destroyAllWindows()















# import cv2 as cv
# import mediapipe as mp
# import numpy as np
# import json
# import tensorflow as tf
# from collections import deque

# # --- SETTINGS ---
# TFLITE_MODEL_PATH = "models/sign_model.tflite" 
# LABELS_PATH = "models/labels.json"
# SEQUENCE_LENGTH = 50 
# THRESHOLD = 0.85      # Higher threshold for 1480 classes
# VOTING_SIZE = 10      # Number of predictions to look back at

# # --- INITIALIZE ---
# mp_holistic = mp.solutions.holistic
# mp_drawing = mp.solutions.drawing_utils
# holistic = mp_holistic.Holistic(min_detection_confidence=0.7, min_tracking_confidence=0.7)

# interpreter = tf.lite.Interpreter(model_path=TFLITE_MODEL_PATH)
# interpreter.allocate_tensors()
# input_details = interpreter.get_input_details()
# output_details = interpreter.get_output_details()

# with open(LABELS_PATH, 'r') as f:
#     labels_dict = json.load(f)

# # --- STATE VARIABLES ---
# sequence = []
# prediction_history = deque(maxlen=VOTING_SIZE) 
# current_display_word = "Waiting..."

# def extract_pose(result):
#     if result.pose_landmarks:
#         pose_lm = np.array([[lm.x, lm.y, lm.z, lm.visibility] for lm in result.pose_landmarks.landmark])
#         # Use same logic as your preprocessing
#         left_sh, right_sh = pose_lm[11, :3], pose_lm[12, :3]
#         center = (left_sh + right_sh) / 2
#         scale = np.linalg.norm(left_sh - right_sh) + 1e-6
#         pose_lm[:, :3] = (pose_lm[:, :3] - center) / scale
#         return pose_lm.flatten().tolist()
#     return [0.0] * 132

# def extract_hand(hand_lm, result):
#     # We need center/scale from pose for consistent normalization
#     if result.pose_landmarks:
#         pose_lm = np.array([[lm.x, lm.y, lm.z] for lm in result.pose_landmarks.landmark])
#         center = (pose_lm[11] + pose_lm[12]) / 2
#         scale = np.linalg.norm(pose_lm[11] - pose_lm[12]) + 1e-6
#         if hand_lm:
#             hand = np.array([[lm.x, lm.y, lm.z] for lm in hand_lm.landmark])
#             return ((hand - center) / scale).flatten().tolist()
#     return [0.0] * 63

# cap = cv.VideoCapture(0)

# while cap.isOpened():
#     ret, frame = cap.read()
#     if not ret: break

#     frame = cv.flip(frame, 1)
#     image = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
#     results = holistic.process(image)
#     image = cv.cvtColor(image, cv.COLOR_RGB2BGR)

#     # Landmarks for visual feedback
#     mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS)
#     mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS)

#     # Feature Extraction
#     pose = extract_pose(results)
#     rh = extract_hand(results.right_hand_landmarks, results)
#     lh = extract_hand(results.left_hand_landmarks, results)
    
#     sequence.append(pose + rh + lh)
#     sequence = sequence[-SEQUENCE_LENGTH:] 

#     if len(sequence) == SEQUENCE_LENGTH:
#         # Check if either hand is visible to avoid empty predictions
#         if results.left_hand_landmarks or results.right_hand_landmarks:
            
#             input_data = np.expand_dims(sequence, axis=0).astype(np.float32)
            
#             # 🔥 MATCH TRAINING NORMALIZATION
#             input_data = input_data / 100.0  
            
#             interpreter.set_tensor(input_details[0]['index'], input_data)
#             interpreter.invoke()
#             res = interpreter.get_tensor(output_details[0]['index'])[0]
            
#             idx = np.argmax(res)
#             confidence = res[idx]
            
#             # Add to voting history
#             prediction_history.append(idx)
            
#             # Stability Trigger: Must be the most frequent in last 10 frames
#             most_common = max(set(prediction_history), key=prediction_history.count)
            
#             if confidence > THRESHOLD and prediction_history.count(most_common) > 7:
#                 word = labels_dict.get(str(most_common), "Unknown")
#                 current_display_word = f"{word} ({int(confidence*100)}%)"
                
#                 # 🔥 MADAM'S FIX: Clear sequence to avoid half-sign contamination
#                 sequence = [] 
#                 prediction_history.clear()
#             else:
#                 current_display_word = "Analyzing..."
#         else:
#             current_display_word = "Idle (Show Hands)"

#     # UI Display
#     cv.rectangle(image, (0,0), (640, 50), (30, 30, 30), -1)
#     cv.putText(image, current_display_word, (15, 35), 
#                cv.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv.LINE_AA)

#     # Progress bar for the 50-frame buffer
#     cv.rectangle(image, (0, 470), (int(len(sequence)*12.8), 480), (255, 255, 0), -1)

#     cv.imshow('ASL 1480 Translator', image)
#     if cv.waitKey(1) & 0xFF == ord('q'): break

# cap.release()
# cv.destroyAllWindows()


































# import cv2 as cv
# import mediapipe as mp
# import numpy as np
# import json
# import tensorflow as tf
# from collections import deque

# # --- SETTINGS ---
# TFLITE_MODEL_PATH = "models/sign_model.tflite" 
# LABELS_PATH = "models/labels.json"
# SEQUENCE_LENGTH = 50 
# THRESHOLD = 0.70      # Lowered slightly because 1480 classes are very sensitive
# VOTING_SIZE = 12      # Increased to ensure the sign is stable

# # --- INITIALIZE ---
# mp_holistic = mp.solutions.holistic
# mp_drawing = mp.solutions.drawing_utils
# holistic = mp_holistic.Holistic(min_detection_confidence=0.7, min_tracking_confidence=0.7)

# interpreter = tf.lite.Interpreter(model_path=TFLITE_MODEL_PATH)
# interpreter.allocate_tensors()
# input_details = interpreter.get_input_details()
# output_details = interpreter.get_output_details()

# with open(LABELS_PATH, 'r') as f:
#     labels_dict = json.load(f)

# # --- STATE VARIABLES ---
# sequence = []
# prediction_history = deque(maxlen=VOTING_SIZE) 
# current_display_word = "Waiting..."

# def extract_pose(result):
#     if result.pose_landmarks:
#         pose_lm = np.array([[lm.x, lm.y, lm.z, lm.visibility] for lm in result.pose_landmarks.landmark])
#         left_sh, right_sh = pose_lm[11, :3], pose_lm[12, :3]
#         center = (left_sh + right_sh) / 2
#         scale = np.linalg.norm(left_sh - right_sh) + 1e-6
#         pose_lm[:, :3] = (pose_lm[:, :3] - center) / scale
#         return pose_lm.flatten().tolist()
#     return [0.0] * 132

# def extract_hand(hand_lm, result):
#     if result.pose_landmarks:
#         pose_lm = np.array([[lm.x, lm.y, lm.z] for lm in result.pose_landmarks.landmark])
#         center = (pose_lm[11] + pose_lm[12]) / 2
#         scale = np.linalg.norm(pose_lm[11] - pose_lm[12]) + 1e-6
#         if hand_lm:
#             hand = np.array([[lm.x, lm.y, lm.z] for lm in hand_lm.landmark])
#             return ((hand - center) / scale).flatten().tolist()
#     return [0.0] * 63

# cap = cv.VideoCapture(0)

# while cap.isOpened():
#     ret, frame = cap.read()
#     if not ret: break

#     frame = cv.flip(frame, 1)
#     image = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
#     results = holistic.process(image)
#     image = cv.cvtColor(image, cv.COLOR_RGB2BGR)

#     # Visual Feedback
#     mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS)
#     mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS)

#     # Feature Extraction
#     pose = extract_pose(results)
#     rh = extract_hand(results.right_hand_landmarks, results)
#     lh = extract_hand(results.left_hand_landmarks, results)
    
#     sequence.append(pose + rh + lh)
#     sequence = sequence[-SEQUENCE_LENGTH:] 

#     if len(sequence) == SEQUENCE_LENGTH:
#         if results.left_hand_landmarks or results.right_hand_landmarks:
#             input_data = np.array(sequence).astype(np.float32)
            
#             # 🔥 MATCH THE NEW TRAINING NORMALIZATION
#             mean = np.mean(input_data)
#             std = np.std(input_data)
#             input_data = (input_data - mean) / (std + 1e-6)
            
#             input_data = np.expand_dims(input_data, axis=0)
            
#             interpreter.set_tensor(input_details[0]['index'], input_data)
#             interpreter.invoke()
#             # ... rest of the code ...
#             res = interpreter.get_tensor(output_details[0]['index'])[0]
            
#             idx = np.argmax(res)
#             confidence = res[idx]
            
#             prediction_history.append(idx)
#             most_common = max(set(prediction_history), key=prediction_history.count)
            
#             # Stability Trigger: Must be frequent in history AND above threshold
#             if confidence > THRESHOLD and prediction_history.count(most_common) > 8:
#                 word = labels_dict.get(str(most_common), "Unknown")
#                 current_display_word = f"{word} ({int(confidence*100)}%)"
                
#                 # Clear buffer to avoid repeating the same sign
#                 sequence = [] 
#                 prediction_history.clear()
#             else:
#                 current_display_word = "Analyzing movement..."
#         else:
#             current_display_word = "Idle (Show Hands)"

#     # --- UI ---
#     cv.rectangle(image, (0,0), (640, 60), (30, 30, 30), -1)
#     cv.putText(image, current_display_word, (20, 40), 
#                cv.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv.LINE_AA)

#     cv.imshow('ASL 1480 Translator', image)
#     if cv.waitKey(1) & 0xFF == ord('q'): break

# cap.release()
# cv.destroyAllWindows()























# import cv2 as cv
# import mediapipe as mp
# import numpy as np
# import json
# import tensorflow as tf
# from collections import deque

# # --- SETTINGS ---
# # Use your Phase 1 .keras file here
# # TFLITE_MODEL_PATH = "models/sign_model.tflite" 
# # LABELS_PATH = "models/labels.json"
# MODEL_PATH = "models/sign_model.tflite" 
# LABELS_PATH = "models/labels.json"
# SEQUENCE_LENGTH = 50 
# THRESHOLD = 0.65      # If confidence is below this, show "No Match"
# VOTING_SIZE = 10      # Number of frames to look back for stability

# # --- INITIALIZE ---
# mp_holistic = mp.solutions.holistic
# mp_drawing = mp.solutions.drawing_utils
# holistic = mp_holistic.Holistic(min_detection_confidence=0.7, min_tracking_confidence=0.7)

# print("🧠 Loading Model...")
# model = tf.keras.models.load_model(MODEL_PATH)

# with open(LABELS_PATH, 'r') as f:
#     labels_dict = json.load(f)

# # --- STATE VARIABLES ---
# sequence = []
# prediction_history = deque(maxlen=VOTING_SIZE) 
# current_display_word = "Waiting..."
# color = (0, 255, 0) # Green for match, Red for no match

# def extract_landmarks(results):
#     """Matches the logic used during your Phase 2 Training"""
#     # Pose: 33 landmarks * 4 (x, y, z, vis) = 132
#     if results.pose_landmarks:
#         pose = np.array([[lm.x, lm.y, lm.z, lm.visibility] for lm in results.pose_landmarks.landmark]).flatten()
#     else:
#         pose = np.zeros(132)
        
#     # Hands: 21 landmarks * 3 (x, y, z) = 63 each
#     lh = np.array([[lm.x, lm.y, lm.z] for lm in results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(63)
#     rh = np.array([[lm.x, lm.y, lm.z] for lm in results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(63)
    
#     return np.concatenate([pose, rh, lh]) # Order must match your training script!

# cap = cv.VideoCapture(0)

# while cap.isOpened():
#     ret, frame = cap.read()
#     if not ret: break

#     frame = cv.flip(frame, 1)
#     image = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
#     results = holistic.process(image)
#     image = cv.cvtColor(image, cv.COLOR_RGB2BGR)

#     # 1. Feature Extraction
#     landmarks = extract_landmarks(results)
#     sequence.append(landmarks)
#     sequence = sequence[-SEQUENCE_LENGTH:] 

#     if len(sequence) == SEQUENCE_LENGTH:
#         # 2. MATCH TRAINING NORMALIZATION (Section 7 of your training code)
#         input_data = np.array(sequence, dtype=np.float32)
#         input_data = np.nan_to_num(input_data)
#         input_data = np.clip(input_data, -10.0, 10.0) / 10.0 # <--- THIS IS CRITICAL
        
#         # 3. Prediction
#         res = model.predict(np.expand_dims(input_data, axis=0), verbose=0)[0]
#         idx = np.argmax(res)
#         confidence = res[idx]
        
#         prediction_history.append(idx)
        
#         # 4. Logic for "Best Match" vs "No Match"
#         if confidence > THRESHOLD:
#             # Check if the last 8/10 predictions are the same (Stability)
#             most_common = max(set(prediction_history), key=prediction_history.count)
#             if prediction_history.count(most_common) > 7:
#                 word = labels_dict.get(str(most_common), "Unknown")
#                 current_display_word = f"{word} ({int(confidence*100)}%)"
#                 color = (0, 255, 0) # Green
#             else:
#                 current_display_word = "Stabilizing..."
#                 color = (0, 255, 255) # Yellow
#         else:
#             current_display_word = "No Clear Match"
#             color = (0, 0, 255) # Red

#     # --- UI Drawing ---
#     cv.rectangle(image, (0,0), (640, 60), (30, 30, 30), -1)
#     cv.putText(image, current_display_word, (20, 40), 
#                cv.FONT_HERSHEY_SIMPLEX, 1, color, 2, cv.LINE_AA)
    
#     # Draw hand connections for user feedback
#     mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS)
#     mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS)

#     cv.imshow('Sign Language Translator', image)
#     if cv.waitKey(1) & 0xFF == ord('q'): break

# cap.release()
# cv.destroyAllWindows()

























# import cv2 as cv
# import mediapipe as mp
# import numpy as np
# import json
# import tensorflow as tf
# from collections import deque

# # --- SETTINGS ---
# TFLITE_MODEL_PATH = "models/sign_model_100.tflite" 
# LABELS_PATH = "models/labels_100.json"
# SEQUENCE_LENGTH = 50 
# THRESHOLD = 0.65      # Minimum confidence to show a result
# VOTING_SIZE = 10      # Stability buffer

# # --- INITIALIZE ---
# mp_holistic = mp.solutions.holistic
# mp_drawing = mp.solutions.drawing_utils
# holistic = mp_holistic.Holistic(min_detection_confidence=0.7, min_tracking_confidence=0.7)

# print("🧠 Loading TFLite Model...")
# interpreter = tf.lite.Interpreter(model_path=TFLITE_MODEL_PATH)
# interpreter.allocate_tensors()
# input_details = interpreter.get_input_details()
# output_details = interpreter.get_output_details()

# with open(LABELS_PATH, 'r') as f:
#     labels_dict = json.load(f)

# # --- STATE VARIABLES ---
# sequence = []
# prediction_history = deque(maxlen=VOTING_SIZE) 
# current_display_word = "Waiting..."
# ui_color = (0, 255, 0)

# def extract_landmarks(results):
#     """Matches the exact logic used in your 572-class training"""
#     # Pose: 33 landmarks * 4 (x, y, z, vis) = 132
#     if results.pose_landmarks:
#         pose = np.array([[lm.x, lm.y, lm.z, lm.visibility] for lm in results.pose_landmarks.landmark]).flatten()
#     else:
#         pose = np.zeros(132)
        
#     # Hands: 21 landmarks * 3 (x, y, z) = 63 each
#     lh = np.array([[lm.x, lm.y, lm.z] for lm in results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(63)
#     rh = np.array([[lm.x, lm.y, lm.z] for lm in results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(63)
    
#     return np.concatenate([pose, rh, lh])

# # cap = cv.VideoCapture(0)
# cap=cv.VideoCapture("bag.mp4")

# while cap.isOpened():
#     ret, frame = cap.read()
#     if not ret: break

#     # frame = cv.flip(frame, 1)
#     image = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
#     results = holistic.process(image)
#     image = cv.cvtColor(image, cv.COLOR_RGB2BGR)

#     # 1. Feature Extraction
#     landmarks = extract_landmarks(results)
#     sequence.append(landmarks)
#     sequence = sequence[-SEQUENCE_LENGTH:] 

#     if len(sequence) == SEQUENCE_LENGTH:
#         # 2. PREPROCESSING (Must match your Phase 2 Training exactly)
#         input_data = np.array(sequence, dtype=np.float32)
#         input_data = np.nan_to_num(input_data)
#         # Your model was trained with this specific normalization:
#         input_data = np.clip(input_data, -10.0, 10.0) / 10.0 
        
#         # Prepare for TFLite (Add Batch Dimension)
#         input_data = np.expand_dims(input_data, axis=0)
        
#         # 3. TFLITE INFERENCE
#         interpreter.set_tensor(input_details[0]['index'], input_data)
#         interpreter.invoke()
#         res = interpreter.get_tensor(output_details[0]['index'])[0]
#         print(f"Max Confidence: {np.max(res)*100:.2f}% | Predicted Index: {np.argmax(res)}")
        
#         idx = np.argmax(res)
#         confidence = res[idx]
#         prediction_history.append(idx)
        
#         # 4. STABILITY & UI LOGIC
#         # 4. STABILITY & UI LOGIC
#         if confidence > THRESHOLD:
#             most_common = max(set(prediction_history), key=prediction_history.count)
#             if prediction_history.count(most_common) > 5: # Reduced for faster detection
#                 word = labels_dict.get(str(most_common), "Unknown")
#                 current_display_word = f"DETECTED: {word}"
#                 print(f"🔥 Found Sign: {word} ({int(confidence*100)}%)")
                
#                 # --- CRITICAL CHANGE FOR MULTI-WORD VIDEOS ---
#                 sequence = []              # Wipe the buffer
#                 prediction_history.clear() # Reset history
#                 # ---------------------------------------------
                
#                 ui_color = (0, 255, 0)
#     # --- DRAW UI ---
#     cv.rectangle(image, (0,0), (640, 60), (30, 30, 30), -1)
#     cv.putText(image, current_display_word, (20, 40), 
#                cv.FONT_HERSHEY_SIMPLEX, 1, ui_color, 2, cv.LINE_AA)
    
#     mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS)
#     mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS)

#     cv.imshow('SignSpeek Live AI', image)
#     if cv.waitKey(1) & 0xFF == ord('q'): break

# cap.release()
# cv.destroyAllWindows()





















# import cv2 as cv
# import mediapipe as mp
# import numpy as np
# import json
# import tensorflow as tf

# # --- SETTINGS ---
# TFLITE_MODEL_PATH = "models/sign_model_100.tflite" 
# LABELS_PATH = "models/labels_100.json"
# VIDEO_PATH = "testall.mp4" # Path to your dataset video
# SEQUENCE_LENGTH = 50 

# # --- INITIALIZE ---
# mp_holistic = mp.solutions.holistic
# holistic = mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5)

# interpreter = tf.lite.Interpreter(model_path=TFLITE_MODEL_PATH)
# interpreter.allocate_tensors()
# input_details = interpreter.get_input_details()
# output_details = interpreter.get_output_details()

# with open(LABELS_PATH, 'r') as f:
#     labels_dict = json.load(f)

# def extract_landmarks_perfect(results):
#     if results.pose_landmarks:
#         pose_lm = np.array([[lm.x, lm.y, lm.z, lm.visibility] for lm in results.pose_landmarks.landmark])
#         # Shoulder Centering Logic (Must match Preprocessing)
#         left_sh, right_sh = pose_lm[11, :3], pose_lm[12, :3]
#         center = (left_sh + right_sh) / 2
#         scale = np.linalg.norm(left_sh - right_sh) + 1e-6

#         pose_lm[:, :3] = (pose_lm[:, :3] - center) / scale
        
#         def norm_hand(hand_lm):
#             if not hand_lm: return np.zeros(63)
#             h = np.array([[lm.x, lm.y, lm.z] for lm in hand_lm.landmark])
#             return ((h - center) / scale).flatten()

#         return np.concatenate([pose_lm.flatten(), norm_hand(results.right_hand_landmarks), norm_hand(results.left_hand_landmarks)])
#     return np.zeros(258)

# cap = cv.VideoCapture("bring.mp4")
# sequence = []

# print(f"🎬 Starting Validation on: {VIDEO_PATH}")
# print("-" * 50)

# while cap.isOpened():
#     ret, frame = cap.read()
#     if not ret: break

#     # IMPORTANT: No cv.flip() for dataset videos!
#     image = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
#     results = holistic.process(image)
    
#     landmarks = extract_landmarks_perfect(results)
#     sequence.append(landmarks)
#     sequence = sequence[-SEQUENCE_LENGTH:] 

#     if len(sequence) == SEQUENCE_LENGTH:
#         input_data = np.expand_dims(np.array(sequence, dtype=np.float32), axis=0)
#         input_data = np.nan_to_num(np.clip(input_data, -2.0, 2.0))
        
#         interpreter.set_tensor(input_details[0]['index'], input_data)
#         interpreter.invoke()
#         res = interpreter.get_tensor(output_details[0]['index'])[0]
        
#         # Get Top 3 Predictions
#         top_indices = np.argsort(res)[-3:][::-1]
        
#         print(f"Frame {int(cap.get(cv.CAP_PROP_POS_FRAMES))}: ", end="")
#         for i in top_indices:
#             word = labels_dict.get(str(i), "Unknown")
#             prob = res[i] * 100
#             print(f"[{word}: {prob:.1f}%] ", end="")
#         print("") # Newline

#     cv.imshow('Validation Mode', frame)
#     if cv.waitKey(1) & 0xFF == ord('q'): break

# cap.release()
# cv.destroyAllWindows()





























import cv2 as cv
import mediapipe as mp
import numpy as np
import json
import tensorflow as tf
from collections import Counter

# --- SETTINGS ---
# Ensure karein ke ye files sahi folder mein hain
TFLITE_MODEL_PATH = "models/final_expo_model.tflite" 
LABELS_PATH = "models/labels_expo_100.json"
SEQUENCE_LENGTH = 50 
THRESHOLD = 0.85  # 60% confidence threshold

# --- INITIALIZE MEDIAPIPE ---
mp_holistic = mp.solutions.holistic
mp_drawing = mp.solutions.drawing_utils

# --- LANDMARK EXTRACTION FUNCTION (Training Logic ke mutabiq) ---
def extract_landmarks_perfect(results):
    # 1. Pose Landmarks (33, 4)
    if results.pose_landmarks:
        pose_lm = np.array([[lm.x, lm.y, lm.z, lm.visibility] for lm in results.pose_landmarks.landmark])
        
        # --- TRAINING LOGIC: Shoulder Centering ---
        # Shoulder indices: Left=11, Right=12
        left_sh, right_sh = pose_lm[11, :3], pose_lm[12, :3]
        center = (left_sh + right_sh) / 2
        scale = np.linalg.norm(left_sh - right_sh) + 1e-6
        
        # Center the pose coordinates
        pose_lm[:, :3] = (pose_lm[:, :3] - center) / scale
        pose = pose_lm.flatten() # 33 * 4 = 132
        
        # Helper for Hands
        def norm_hand(hand_lm):
            if not hand_lm: return np.zeros(63)
            h = np.array([[lm.x, lm.y, lm.z] for lm in hand_lm.landmark])
            return ((h - center) / scale).flatten() # Scale hands according to shoulders
        
        lh = norm_hand(results.left_hand_landmarks) # 63
        rh = norm_hand(results.right_hand_landmarks) # 63
        
        return np.concatenate([pose, lh, rh]) # Total 258
    
    return np.zeros(258)
# --- SETUP TFLITE INTERPRETER ---
interpreter = tf.lite.Interpreter(model_path=TFLITE_MODEL_PATH)
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Load Labels
with open(LABELS_PATH, 'r') as f:
    labels_dict = json.load(f)

# --- START CAPTURING ---
predictions_history = []
sequence = []
sentence = ""
confidence = 0.0

# Video ya Webcam
cap = cv.VideoCapture("drink.mp4") # Webcam ke liye 0 likhein

# MediaPipe model context start karein
with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret: break

        # 1. MediaPipe Detection
        image = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
        image.flags.writeable = False
        results = holistic.process(image)
        image.flags.writeable = True
        frame = cv.cvtColor(image, cv.COLOR_RGB2BGR)

        # 2. Landmarks Extract karein
        landmarks = extract_landmarks_perfect(results)
        sequence.append(landmarks)
        sequence = sequence[-SEQUENCE_LENGTH:] 

        # 3. Prediction (Jab sequence length poori ho jaye)
        if len(sequence) == SEQUENCE_LENGTH:
            input_data = np.expand_dims(np.array(sequence, dtype=np.float32), axis=0)
            
            interpreter.set_tensor(input_details[0]['index'], input_data)
            interpreter.invoke()
            res = interpreter.get_tensor(output_details[0]['index'])[0]
            
            predicted_idx = np.argmax(res)
            confidence = res[predicted_idx]

            # 4. Smoothing Logic
            if confidence > THRESHOLD:
                predictions_history.append(predicted_idx)
                predictions_history = predictions_history[-25:] # 15 frames ka buffer
                
                most_common = Counter(predictions_history).most_common(1)[0][0]
                sentence = labels_dict.get(str(most_common), "Predicting...")

        # 5. Visuals (Drawing)
        # Landmarks screen par dikhane ke liye (Optional but looks cool for Expo)
        mp_drawing.draw_landmarks(frame, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS)
        mp_drawing.draw_landmarks(frame, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS)

        # UI Bar
        cv.rectangle(frame, (0,0), (640, 45), (245, 117, 16), -1)
        cv.putText(frame, f'Sign: {sentence} ({confidence*100:.1f}%)', (15, 35), 
                   cv.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv.LINE_AA)

        cv.imshow('Sign Language Expo Demo', frame)
        
        if cv.waitKey(1) & 0xFF == ord('q'): break

cap.release()
cv.destroyAllWindows()