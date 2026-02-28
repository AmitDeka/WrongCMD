# 📢 WrongCMD

Make your terminal failures hilarious. **WrongCMD** is a fun, lightweight VS Code extension that instantly plays a sound whenever you type an invalid command or your terminal throws an error.

Whether you want to be roasted by classic memes or use your own custom buzzer, this extension brings a little joy to the frustrating moments of debugging.

## ✨ Features (Version 1.0.0)

- **Built-in Meme Sounds:** Comes fully loaded with classic audio clips right out of the box:
  - _Fahhh_
  - _Abe Sale_
  - _Baigan_
  - _Anime Ahh_
  - _CID Sound_
- **Custom Audio Support:** Don't like the defaults? Point the extension to any local `.wav` file on your computer to play your own custom sound.
- **Smart Detection:** Uses VS Code's native Shell Integration API to detect when a command fails natively, without slowing down your editor.
- **Customizable Triggers:** Configure exactly which terminal error phrases trigger the audio, making it compatible with Bash, Zsh, PowerShell, and CMD.

## ⚙️ Extension Settings

This extension contributes the following settings. You can easily modify them by going to VS Code **Settings** (`Ctrl + ,` or `Cmd + ,`) and searching for `WrongCMD`.

- `wrongcmd.soundChoice`: Dropdown to select which built-in meme sound to play, or select `Custom` to use your own file.
- `wrongcmd.customSoundPath`: The absolute path to your custom `.wav` file (e.g., `C:\audio\my-sound.wav`). _Note: This is only used if the sound choice above is set to 'Custom'._
- `wrongcmd.errorKeywords`: An array of phrases the extension looks for to determine if a command failed (e.g., "command not found", "is not recognized", "does not exist"). Add phrases specific to your preferred shell!

## 🚀 Future Work (Roadmap)

We are just getting started! Here are a few features planned for future updates:

- **Smart "Ignore List" Engine:** Transitioning away from hard-coded error phrases to an intelligent "ignore list" that automatically plays a sound on _any_ non-zero exit code, unless it's a trusted command like `git` or `npm`.
- **Volume Control:** A dedicated setting to adjust the playback volume directly within VS Code so you don't jump out of your chair.
- **File Picker UI:** Adding a graphical file picker for custom sounds so you don't have to manually type out the absolute file paths.
- **More Built-in Sounds:** Expanding the default meme library based on community suggestions!

## ⚠️ Important Note for Custom Sounds

If you choose to use a custom sound file, **it must be a `.wav` file.** To keep this extension lightweight and ensure it works perfectly across Windows, macOS, and Linux without requiring users to install heavy third-party audio drivers, `.mp3` files are not supported for the custom path.

## 🛠️ Troubleshooting

**The sound isn't playing!**
WrongCMD relies on VS Code's "Terminal Shell Integration". If you do not see the colored dots (blue for success, red for failure) on the left side of your terminal prompt, shell integration might be disabled for your specific terminal profile. Shell integration is enabled by default for Bash, Zsh, and PowerShell.
