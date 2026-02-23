MyProgression 

A simple and effective web app to log your workouts, track your progress, and generate new training sessions. 

Built with express/node as backend and a frontend UI with HTML, CSS, JS to log and display data points. 

Features

- Workout Log: Easily record your daily training sessions.
- Training History: View and analyze your past workouts to track progress.
- REST API for CRUD operations
- Typescript, vite
- Database: Mongodb 
- Clean, minimal frontend interface

installation and setuo
1. Clone the repo:
   git clone https://github.com/Erik-Jishammar/Training-app.git
   cd MyProgression
  

2. Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory and add your MongoDB connection string:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the application**:
   ```bash
   # Start the server and client concurrently
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.


   Roadmap(future plans)

- My goal is to soon migrate the vanilla TS frontend to react. 
- Expanded Workout Database with more exercises and specialized training programs.
- Progress Visualization**: Interactive charts and graphs to visualize performance over time.
- Social Features**: Ability to share workouts or follow friends (TBD).
-  I want to integrate AI in order to quickly generate personalized workout plans.
