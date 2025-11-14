README_DEPLOY.txt
==================
(Strictly: deployment steps only, concise)

1) Push this project to GitHub (create a new repository and upload all files).

2) Deploy backend (Render)
   - Go to https://render.com -> New -> Web Service
   - Connect your GitHub repo, choose the 'backend' folder as the root.
   - Set Build Command: None (server uses node)
   - Start Command: node server.js
   - Set Environment Variables (in Render dashboard):
     REPLICATE_API_TOKEN = <your_replicate_token>
     FIREBASE_PROJECT_ID = <your_firebase_project_id>
     FIREBASE_CLIENT_EMAIL = <firebase_client_email>
     FIREBASE_PRIVATE_KEY = <firebase_private_key_json_escaped>
     DAILY_FREE_MINUTES = 120

   - Deploy and copy the service URL (e.g. https://smart-ai-backend.onrender.com)

3) Deploy frontend (Vercel)
   - Go to https://vercel.com -> New Project -> Import GitHub repo
   - Set Root Directory to 'frontend'
   - In Environment Variables add:
     REACT_APP_BACKEND_URL = https://your-backend-url
   - Deploy; your site will appear at https://<your-vercel-app>.vercel.app

4) Firebase setup (for auth + usage tracking)
   - Go to https://console.firebase.google.com and create a new project.
   - Enable Authentication (Email & Google sign-in).
   - Create a Service Account (Project Settings -> Service Accounts -> Generate new private key)
   - Copy service account JSON fields into Render env variables above.

5) Replace placeholders
   - Edit backend/server.js to call Replicate models:
     * Use fetch/axios to POST to https://api.replicate.com/v1/predictions
     * Provide model version and inputs according to Replicate docs.
   - For text->video, replace the /api/video placeholder with the chosen model's API call.

6) Usage limits
   - Backend skeleton contains comment locations where to add Firebase token verification
     and increment per-user usage minutes in Firestore.

That's it. After steps 2 & 3 your site will be live.

