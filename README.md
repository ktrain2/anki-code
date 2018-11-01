# anki-code
Contains code for anything I work on related to Anki

You need to log into memrise, and then navigate to the course you want to download (e.g. https://www.memrise.com/course/2021373/mandarin-chinese-1/). Then go into Developer Options or a similar thing (F12 on the browsers I use) and go to "Console". Paste this code there and press Enter. Note that doing this type of thing blindly could give someone else information you don't want to, so only do this if you trust that it's safe.

This version works on the first two levels of Chinese, but has problems after due to memrise mixing styles together. I think it works on Spanish (if you comment out the hanzi, and change the return line at the bottom) but doesn't work on Russian (this can be fixed by finding what's different in the Russian information. For Russian, "visible-info" needs to become "hidden info" for the audio (I think), and the base bit of audio needs changing(definitely)) or Japanese ("Character" needs to be replaced with "romaji"). I would have liked to make it more adaptable, but I don't really have the time and computer access in the near future to do this.
