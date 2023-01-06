# SuperKafka

## Welcome to SuperKafka!

This is an event-management portal with real time chat functionality. I made this app using the following tech stack -

1. Next.js 13 (used experimental appDir feature - so have app folder instead of traditional Next.js 12 pages folder as main)
2. TypeScript
3. Upstash (Redis database where messages are stored and pulled from)
4. Pusher (Real-time listeners)
5. SWR (for data-fetching - server side rendering)
6. Custom API endpoints under the folder -> pages/api
7. NextAuth.js (for Google authentication)
8. Tailwind CSS (utility class enabled CSS)
9. Firebase Firestore (for storing event details & mapping through them to display)
10. Headless UI (for modals and drop down menus)
