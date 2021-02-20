# Tabrunner
- React component built on Create React App Template. Mostly a long algorithm of many standard string/array manipulations.
- Arduino component uses ThingPulse's excellent esp8266 OLED display library: https://github.com/ThingPulse/esp8266-oled-ssd1306 
- [Demo](tabrunner.surge.sh)
- (Thanks to surge.sh for free hosting)
- [Demo Video] (https://youtu.be/VTB05UCPm58)

# Usage
1. Get a free guitar tab that has bars from Ultimate Guitar, or any other source of ASCII text guitar tabs
2. Paste it into the textbox and save the text file output somewhere 
3. Copy the text file into the tabrunner.ino file under the "//copypaste after the zero" comment near the top, replacing the lines that are there
4. Build my circuit (lol) and run it! Use +/- buttons to change the speed (the delay is shown on the SSD1306 OLED)
