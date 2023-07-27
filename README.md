# Trailblazer level calculator

## Description

Trailblazer level calculator is a simple tool that allows players to calculate the amount of experience points (exp) required to achieve a specific rank in a game. 


## Disclaimer

Please note that the accuracy of the calculated experience points heavily relies on the correctness of the input data.
It doesn't handle large jumps of Equilibrium Level so it will miscalculate a little for Daily Training EXP.

## Development

To set up the development environment for the Trailblazer level calculator, follow the steps below:

### Prerequisites

Make sure you have the following software installed on your system:

1. **Node.js**: Ensure you have Node.js installed. You can download it from the official website: https://nodejs.org

2. **Git**: Install Git on your machine. You can download it from the official website: https://git-scm.com/

### Clone the Repository

1. Open your terminal or command prompt.

2. Change the current working directory to the location where you want to store the project.

3. Clone the repository by running the following command:

   ```bash
   git clone https://github.com/nlr/trailblazer-level.git
   ```

### Install Dependencies

1. Navigate to the project directory by using the `cd` command in your terminal.

2. Install the required Node.js packages by running the following command:

   ```bash
   npm install
   ```

   This will install all the dependencies specified in the `package.json` file, including development tools and libraries.

### Starting the Development Server

To start the development server and run the Trailblazer level calculator locally, use the following command:

```bash
npm run dev
```

This command will start the development server provided by Vite, a fast build tool for JavaScript applications. Vite allows for rapid development and hot module replacement, enabling you to see changes in real-time as you edit the code.

Once the server starts, you should see a message in the terminal indicating the local address where the application is running.

### Building the Project

To build the project for production deployment, use the following command:

```bash
npm run build
```

This command will first transpile the TypeScript code into JavaScript using the TypeScript compiler (`tsc`) and then bundle the application for production using Vite. The output will be stored in the `dist` directory.
