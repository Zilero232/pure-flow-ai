# pure-flow-ai 🚫✨

<p align="center">
	<a href="https://github.com/Zilero232/pure-flow-ai">
    	<img src="https://img.shields.io/github/actions/workflow/status/Zilero232/pure-flow-ai/integrate.yaml?label=CI&logo=GitHub" alt="CI status">
  	</a>
	<a href="https://www.npmjs.com/package/pure-flow-ai">
    	<img src="https://img.shields.io/npm/dm/pure-flow-ai?logo=NPM" alt="npm downloads">
  	</a>
	<a href="https://github.com/Zilero232/pure-flow-ai">
    	<img src="https://img.shields.io/npm/l/pure-flow-ai" alt="npm license">
  	</a>
	<a href="https://github.com/Zilero232/pure-flow-ai">
    	<img src="https://img.shields.io/npm/v/pure-flow-ai?label=version" alt="version">
  	</a>
</p>

> **Efficient profanity filter** for JavaScript/TypeScript applications with flexible configuration and simple API 🛡️

## Table of Contents

1. [🔍 Description](#-description)
2. [⚡ Features](#-features)
3. [💻 Installation](#-installation)
4. [🚀 Usage](#-usage)
7. [🤝 Contributing](#-contributing)
8. [📄 License](#-license)

## 🔍 Description

**`pure-flow-ai`** is a powerful and flexible profanity filter for JavaScript and TypeScript applications. It provides a simple yet comprehensive API for detecting, masking, and cleaning text from inappropriate language. Perfect for chat applications, comment systems, or any text-processing functionality requiring content moderation.

## ⚡ Features

- 🔍 **Smart Detection**: Efficiently identifies profane words in text
- 🎭 **Flexible Masking**: Customizable placeholder characters for censoring
- 🧹 **Text Cleaning**: Complete removal of inappropriate content
- 📝 **Customizable Lists**: Add your own words to block or allow
- 💪 **TypeScript Support**: Full type definitions included
- 🔄 **Case Insensitive**: Works regardless of letter casing
- 🎯 **Zero Dependencies**: Lightweight and efficient
- 🌍 **Unicode Support**: Works with special characters and different alphabets

## 💻 Installation

### Using npm:

```bash
npm install pure-flow-ai
```

### Using yarn:

```bash
yarn install pure-flow-ai
```

### Using pnpm:

```bash
pnpm install pure-flow-ai
```

### Advanced Example

```typescript
import BadWordFilter from 'pure-flow-ai';

// Initialize with default options.
const { hasProfaneWords, maskProfanity, cleanString } = BadWordFilter({
  additionalBlockWords: ['bad', 'word,']
  excludedWords: ['trash'],
  placeholder: '*',
  overrideBlockWords: true
});

// Check if text contains profanity.
const hasBadWords = hasProfaneWords('your text here');
console.log(hasBadWords); // returns array of found bad words.

// Mask profane words with asterisks
const masked = maskProfanity('your text here');
console.log(masked); // returns text with bad words masked.

// Clean text by removing profane words.
const clean = cleanString('your text here');
console.log(clean); // returns clean text.
```

## 🤝 Contributing

We'd love for you to contribute to `pure-flow-ai`! Whether it's reporting bugs, suggesting features, or submitting pull requests, your help is always appreciated.

### How to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.

## 📜 Code of Conduct

Please follow our [Code of Conduct](CODE_OF_CONDUCT.md) when participating in this project to ensure a welcoming and productive atmosphere.

## 🔒 Security Policy

Security is our priority. If you encounter any issues, please read our full [Security Policy](SECURITY.md) to report vulnerabilities safely and responsibly.

## 👥 Team

These folks keep the project moving and are resources for help.

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="11%">
        <a href="https://career.habr.com/zilero">
          <img src="https://avatars.githubusercontent.com/u/68345676?s=400&u=eb7df22c29a8aca48def78ec54a7526601c9fd8f&v=4" width="100" height="100" alt="Artemev Alexandr - Avatar">
          <br />
          Artemev A. A.
        </a>
      </td>
    </tr>
  </tbody>
</table>

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

🛡️ Make your application safer with pure-flow-ai!

### Support

If you found this project useful, please consider giving it a ⭐️ on Github and sharing it with your friends!
