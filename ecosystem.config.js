module.exports = {
    apps: [
      {
        name: "notifitcations for emails",
        script: "server.ts",
        interpreter: "deno",
        interpreterArgs: "run --allow-write --allow-read --allow-net --allow-env --unstable",
      },
    ],
  };
  
