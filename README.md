# AEGIS

![404 Not Found](logo.webp)

AEGIS is an intelligent emergency detection system designed to identify potential crashes and dangerous motion anomalies and respond to them as quickly as possible.

The system uses a **layered detection approach**, progressively analyzing additional signals to validate an incident and reduce false positives.

### Detection Layers

* **Layer 1 — Initial Anomaly Detection**

  * Analyzes unusual acceleration and rotational movement.
  * Detects sudden impacts, abnormal motion, or movement patterns that could indicate a crash.

* **Layer 2 — Secondary Validation**

  * Analyzes physical movement and surrounding sound.
  * Detects unusually high movement or loud sounds that may provide additional evidence of an incident.
  * Helps distinguish genuine emergencies from false alarms.

* **Layer 3 — Contextual Verification**

  * Tracks location, speed, and movement over time.
  * Detects unusual speed drops or situations where a vehicle remains stationary for an unusually long period.
  * Uses this additional context to determine whether an incident requires escalation.

When multiple signals indicate a serious incident, AEGIS can initiate an emergency response by **alerting designated emergency contacts and emergency services**, while providing critical information such as the person's **location, medical information, and detected incident details**.

The overall goal of AEGIS is to **detect potential emergencies early, intelligently verify them, and get the right help to the right place as quickly as possible.**

---

## Tech Stack

### Machine Learning

* **Python** — Data processing (pandas, numpy, matplotlib) and machine learning development
* **Jupyter Notebook** — Model experimentation, analysis, and development
* **Scikit-learn** — Machine learning and model implementation
* **Logistic Regression** — Used for anomaly classification and prediction
* **Dataset:** https://www.kaggle.com/datasets/drabdulbari/smartphone-imu-road-accident-detection-dataset

### Backend

* **Node.js**
* **Express.js** — Backend API and server-side application logic
* **Socket.IO (WebSockets over TCP)** — Real-time sensor and anomaly data transfer, guaranteeing data sequence integrity for the machine learning time-series windows.

### Frontend

* **React**

The architecture is designed to allow sensor data to flow through the detection pipeline in real time, with the backend coordinating communication between the detection system and the user-facing application.

---

## File Structure

```text
aegis/
│
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── db.js
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── notebook/
│   ├── dataset.csv
│   └── notebook.ipynb
│
├── .gitignore
├── LICENSE
└── README.md
```

### Directory Overview

* **`backend/`** — Contains the server-side application and API structure for AEGIS.

  * **`controllers/`** — Handles application logic for incoming requests.
  * **`middlewares/`** — Contains middleware used during request processing.
  * **`models/`** — Defines the data models used by the backend.
  * **`routes/`** — Contains API route definitions.
  * **`utils/`** — Contains reusable backend utilities and helper functions.
  * **`db.js`** — Handles database-related configuration and connectivity.
  * **`index.js`** — Entry point for the backend server.
  * **`package.json` / `package-lock.json`** — Backend dependencies and project configuration.

* **`notebook/`** — Contains the machine-learning experimentation and dataset used during development.
  * **`notebook.ipynb`** — Jupyter Notebook containing the ML experimentation and anomaly-detection work.
  * **`dataset.csv`** — Dataset used for model development and analysis.

* **`frontend/`** — The React (Vite) user interface for AEGIS.
  * **`src/components/`** — Reusable UI components (StartScreen, Register, Login, HomeScreen).
  * **`src/context/`** — Global state management (e.g., AuthContext for JWT sessions).
  * **`src/hooks/`** — Custom React hooks (e.g., `useSensorWebSocket.ts` for capturing device motion).

* **`.gitignore`** — Specifies files and directories that should not be tracked by Git.

* **`LICENSE`** — Project license.

* **`README.md`** — Project documentation.

---

## Real-Time Data Pipeline

AEGIS utilizes **Socket.IO (WebSockets over TCP)** for real-time, bidirectional communication between the client and the backend. TCP is strictly used over UDP to guarantee data sequence integrity, which is essential for accurate machine learning time-series window evaluations.

### 3-Second Batching System
To balance ultra-low latency for emergency SOS alerts with extreme server efficiency and device battery life, AEGIS employs a **3-second windowed batching approach**. 

Instead of overloading the server with high-frequency (e.g., 50Hz) individual sensor requests, the client buffers gyroscope and accelerometer data locally and sends a single, compiled JSON array every 3 seconds. The backend seamlessly maps this batch into our Logistic Regression inference pipeline, asynchronously evaluating each data point to detect crash-level anomalies without blocking the server's event loop.

### WebSocket Events

* **Listening Events (Ingestion)**
  * `sensor_batch_stream` — Ingests the 3-second JSON array containing `samples` (sensor readings), `timestamp_start`, and `timestamp_end`.

* **Emitting Events (Server Responses)**
  * `anomaly_detected` — Emitted immediately to the client if the batch contains an anomaly. The payload includes critical metadata such as the `anomaly_score`, exact `timestamp`, `trigger_features` (e.g., peak acceleration), and the `suggested_action`.
  * `window_acknowledged` — A lightweight status emitted when a 3-second batch is processed successfully and classified as normal behavior.
  * `batch_error` — Emitted if the server receives a corrupted array or invalid data types, gracefully handling the error without crashing.

---

## Future Development

AEGIS is currently in an early development stage. The **machine-learning API, authentication system, and real-time WebSocket anomaly detection pipeline are currently implemented**, while the remaining layers of the detection and emergency-response pipeline are planned for future development.

### Layer 2 — Secondary Validation

The second detection layer is yet to be implemented and will incorporate additional signals to validate potential incidents.

* Implement **motion sensor anomaly detection**.
* Implement **microphone-based anomaly detection** for unusually loud sounds or sudden acoustic events.
* Combine Layer 2 signals with Layer 1 results to improve confidence in detected incidents.
* Develop logic for determining when an anomaly should progress to the next detection layer.

### Layer 3 — Contextual Verification

The third detection layer is also planned for future implementation.

* Implement **GPS-based tracking**.
* Monitor changes in location and movement over time.
* Detect **unusual speed dips or sudden reductions in speed**.
* Detect when a vehicle remains **stationary at the same location for an unusually long period of time**.
* Use GPS and movement history as additional context when determining whether an incident is genuine.
* Integrate Layer 3 results with the previous detection layers before triggering an emergency response.

### Emergency Response System

Future development will connect the anomaly detection pipeline to the emergency-response system.

* Implement automated escalation based on the severity and confidence of a detected incident.
* Notify registered emergency contacts when a serious incident is detected.
* Integrate emergency-service communication where appropriate.
* Share relevant information such as **current location, medical information, and detected incident details**.
* Build safeguards to prevent accidental or repeated emergency alerts.

### Frontend

The React-based frontend has been established as a Vite Single Page Application (SPA).
* **Live Sensor Dashboard**: A real-time interface monitoring device acceleration and rotation, built via custom hooks.
* **Automated Telemetry**: Seamlessly starts streaming batched 3-second sensor data securely upon user authentication.
* **Authentication & Medical Profiles**: Secure stateful JWT-based Login/Registration flows that capture crucial emergency medical data into a centralized SQLite database.
* **Device & Session Management**: Tracks user sessions in the database, allowing users to view active devices (with IP capture) and remotely revoke access from other locations.
* **iOS Permission Compatibility**: Implements explicit user-gesture permission flows required for `DeviceMotionEvent` access on iOS browsers.
* **Future Work**: Display incident status, detection-layer progress, and emergency-response information in real-time.

### Overall Development Roadmap

```text
Currentgit init.
  │
  ├── ML API                         ✓
  ├── Authentication System          ✓
  ├── Stateful JWT Sessions          ✓
  ├── Real-time WebSocket Layer      ✓
  ├── Motion Anomaly Detection       ✓
  ├── Automated Sensor Tracking      ✓
  ├── iOS Permission Compatibility   ✓
  │
  ▼
Layer 2
  │
  ├── Motion Sensor Anomalies        ☐
  ├── Microphone Anomalies           ☐
  │
  ▼
Layer 3
  │
  ├── GPS Tracking                   ☐
  ├── Speed Dip Detection            ☐
  ├── Stationary-State Detection     ☐
  │
  ▼
Final Integration
  │
  ├── Multi-layer Validation         ☐
  ├── Emergency Contact System       ☐
  ├── Emergency Services Integration ☐
  └── Real-time React Dashboard      ✓
```

AEGIS is being developed incrementally. The **ML, backend foundation, authentication, medical data schemas, and the real-time React dashboard** have now been established. The next major focus is refining the ML inference loop and integrating the remaining detection layers.

---

## Contributing

AEGIS is an ongoing project, and contributions are welcome.

If you would like to contribute:

1. **Fork** the repository.
2. Create a new branch for your changes.
3. Make your improvements or additions.
4. Submit a **Pull Request** with a clear description of your changes.

Whether it is improving anomaly detection, adding new detection layers, working on the backend, frontend, real-time communication, or fixing bugs, every contribution is appreciated.

## Thanks

Thank you to everyone who takes the time to explore, test, contribute to, or provide feedback on AEGIS.

Your contributions help make the project better.
