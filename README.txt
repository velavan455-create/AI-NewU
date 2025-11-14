Smart AI NewU - Ready-to-deploy package
===========================================

Included:
- frontend/  -> React app (minimal)
- backend/   -> Express app (minimal skeleton)
- README_DEPLOY.txt -> deployment steps (concise)

IMPORTANT:
- This package contains placeholder endpoints for AI calls (Replicate / Runway).
- You MUST add your API keys and replace placeholder calls with real API requests.
- Moderation cannot be disabled on third-party AI providers. Safety filters are enforced by the providers.

Environment variables (for backend - set these in Render or your host):
- REPLICATE_API_TOKEN       (your Replicate API token)
- FIREBASE_PROJECT_ID
- FIREBASE_CLIENT_EMAIL
- FIREBASE_PRIVATE_KEY      (service account JSON private key - escape newlines)
- DAILY_FREE_MINUTES        (set to 120)
- PORT (optional)

Frontend env:
- REACT_APP_BACKEND_URL    (set to your backend URL, e.g. https://your-backend.onrender.com)

Admin email provided for initial admin in README: kutty.sexy455@gmail.com

