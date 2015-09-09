# Feed Me

*Feed Me* is a stateless feed aggregator. 

**Note: This project is still under heavily development, things might change unexpectedly.**

This app is [hosted via GitHub pages](http://dev.genitopia.org/feed-me/).

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## About

**What:** *Feed Me* is stateless, as is does not require any form of persistence.
No account with login, no cookies or local storage, no sessions.

**How:** All information needed by *Feed Me* is provided via a URL query string (the stuff after the "?" in the URL).
The query string in turn is an escaped JSON object.
Therefore, a certain setup correlates with a certain URL and that URL alone.

**Why:** The goal of *Feed Me* was to provide a web-based feed aggregator for privacy-tuned browsers,
which e. g. delete session information on close.
Having to log in each browser start was considered annoying.
Also, it now is possible to share a certain setup via a simple link or bookmark it.

## Installation

1. Build: `npm run grunt`
2. Deploy: Copy `dist` folder

This project uses self-contained Node.js scripts, run `npm run` to get a complete list of all commands.

## Usage

All state is supplied to *Feed Me* via an encoded JSON object as URL query string.

1. **Create JSON object**
  
  ```
  {
    "feeds": [
      "http://exmample.com/feed/",
      "http://example.org/feeds/atom.xml"
    ]
  }
  ```

2. **Encode JSON object**
  
  The JSON object has to be single line and special characters have to be escaped. 
  You can use the [generator](http://dev.genitopia.org/feed-me/generator.html) provided with this project.
  All it does is a simple `encodeURIComponent(JSON.stringify(JSON.parse(j2qIn.value)))`.

3. **Append as query string**

  The encoded JSON object can now be appened to the URL as query string, 
  e. g. `http://feed.me/?%7B%22feeds%22%3A%5B%22http%3A%2F%2Fexmample.com%2Ffeed%2F%22%2C%22http%3A%2F%2Fexample.org%2Ffeeds%2Fatom.xml%22%5D%7D`

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request.

## License

*Feed Me* is released under the [MIT license](/LICENSE).
