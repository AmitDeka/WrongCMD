const vscode = require("vscode");
const path = require("path");
const { exec } = require("child_process");

function activate(context) {
  console.log("WrongCMD is active!");

  const commandOutputs = new WeakMap();

  const startDisposable = vscode.window.onDidStartTerminalShellExecution(
    async (e) => {
      let output = "";
      try {
        for await (const chunk of e.execution.read()) {
          output += chunk;
        }
        commandOutputs.set(e.execution, output);
      } catch (err) {
        console.error("WrongCMD: Could not read stream", err);
      }
    },
  );

  const endDisposable = vscode.window.onDidEndTerminalShellExecution((e) => {
    if (e.exitCode !== undefined && e.exitCode > 0) {
      const rawOutput = commandOutputs.get(e.execution) || "";

      const cleanOutput = rawOutput
        .replace(/\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])/g, "")
        .toLowerCase();

      const config = vscode.workspace.getConfiguration("wrongcmd");
      const errorKeywords = config.get("errorKeywords");

      const isError = errorKeywords.some((keyword) =>
        cleanOutput.includes(keyword.toLowerCase()),
      );

      if (isError) {
        console.log("Typo Detected! Playing sound...");
        playSound(context, config);
      }
    }
    commandOutputs.delete(e.execution);
  });

  context.subscriptions.push(startDisposable, endDisposable);
}

function playSound(context, config) {
  const soundChoice = config.get("soundChoice");
  let audioFilePath = "";

  if (soundChoice === "Custom") {
    audioFilePath = config.get("customSoundPath");
    if (!audioFilePath) {
      vscode.window.showErrorMessage("WrongCMD: Custom sound path is empty!");
      return;
    }
  } else {
    const fileMap = {
      Fahhh: "fahhh.wav",
      "Abe Sale": "abe-sale.wav",
      Baigan: "baigan.wav",
      "Anime Ahh": "anime-ahh.wav",
    };
    audioFilePath = path.join(
      context.extensionPath,
      "assets",
      fileMap[soundChoice],
    );
  }

  switch (process.platform) {
    case "darwin":
      exec(`afplay "${audioFilePath}"`, (error) => {
        if (error) console.error("WrongCMD macOS error:", error);
      });
      break;

    case "win32":
      const psCommand = `powershell -NoProfile -NonInteractive -Command "(New-Object System.Media.SoundPlayer '${audioFilePath}').PlaySync()"`;
      exec(psCommand, (error) => {
        if (error) console.error("WrongCMD Windows error:", error);
      });
      break;

    case "linux":
      exec(`aplay "${audioFilePath}"`, (error) => {
        if (error) console.error("WrongCMD Linux error:", error);
      });
      break;
  }
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
