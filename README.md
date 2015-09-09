# Feed Me

*Feed Me* is a stateless feed aggregator. 

**Note:** 
This project is still under heavily development.
Working builds are merged to master and published through gh-pages.

## What

It is stateless, as is does not require any form of persistence.
No account with login, no cookies or local storage, no sessions.

## How

All information needed by *Feed Me* is provided via a URL query string (the stuff after the "?" in the URL).
The query string in turn is a JSON object (with escaped special chars, of course).
Therefore, a certain setup maps to a certain URL and that URL alone.

## Why

The goal of *Feed Me* was to provide a web-based feed aggregator for privacy-tuned browsers,
which e.g. delete session information (cookies, local storage, etc.) on close.
Having to log in each time on browser start was considered annoying and should not be necessary.

Also, it now is possible to share a certain setup via a simple link or bookmark it.

## Furthermore

Not needing an account on a server to store your settings might appeal to the privacy-concerned.
However, as the query string is also transmitted to the server, 
one could thereby get your setup / identify you / track you.

Common feed aggregators store read-state in your account's settings. 
*Feed Me* simply relays on the "visited" information in your browser history (visited links have another color).
Arguably, if you clear you browsing history or are at another computer, that information is lost.

The app is client-only. That allows it to be hosted through GitHub pages.
