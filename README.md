### Source Code
Written and compiled on Windows 10 Home Version 20H2 using VSCode. No external libraries used.

### Software needed to build production build
1. Closure Compiler v20210106
Available at: https://mvnrepository.com/artifact/com.google.javascript/closure-compiler 

### Steps to build production build
1. Download the closure-compiler jar file and place it in the same folder as all kumquat files.
2. Run cmd and change directory to the folder of the closure compiler jar
3. Rename the closure compiler jar file to "compiler.jar"
4. Run java -jar compiler.jar --js content.js main.js workday.js taleo.js greenhouse.js lever.js --js_output_file contentc.js.
5. Run java -jar compiler.jar --js resumepopup.js --js_output_file resumepopupc.js
6. Run java -jar compiler.jar --js background.js --js_output_file backgroundc.js
7. Run java -jar compiler.jar --js config.js --js_output_file configc.js
8. Rename the output files by removing the "c" from them. 
9. Compress the output files along with index.html, manifest.json, style.css, and the .png files into a ZIP file to finish the extension.
