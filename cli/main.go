//go:generate statik -src=./public -include=*.jpg,*.txt,*.html,*.css,*.js

package main

import (
	_ "component-cli/statik"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path"
	"strings"

	"github.com/rakyll/statik/fs"
)

/**
	these are the set of files to read
1. /config/webpack/webpack.dev.js
2. /src/app.tsx
3. /src/index.tsx
4. copy.files.js
5. package.json
6. tsconfig.json
*/

/**
these files needs to be changed with names
1. copy.files.js
2. package.json
3. app.tsx
4. index.tsx
5. webpack.dev.js
*/

func createFolder(path string) {
	os.MkdirAll(path, os.ModePerm)
}

func readContent(fileName string, fs http.FileSystem) string {
	// Access individual files by their paths.
	r, err := fs.Open(fileName)
	if err != nil {
		log.Fatal(err)
	}
	defer r.Close()
	contents, err := ioutil.ReadAll(r)
	if err != nil {
		log.Fatal(err)
	}
	return string(contents)
}

func getFs() http.FileSystem {
	staticFs, err := fs.New()
	if err != nil {
		log.Fatal(err)
	}
	return staticFs
}

func replaceProjectName(content string, projectName string, count int) string {
	return strings.Replace(content, "%projectname%", projectName, count)
}

func writeContent(path, content string) {
	err := ioutil.WriteFile(path, []byte(content), 0644)
	if err != nil {
		log.Fatal(err)
	}
}

func checkIfProjectExists(projectPath string) bool {
	fmt.Println(projectPath)
	_, err := os.Stat(projectPath)
	return err == nil
}

func main() {
	projectName := os.Getenv("ProjectName")
	if projectName == "" {
		log.Fatal("Projectname not provided")
	}
	cwd, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	if checkIfProjectExists(path.Join(cwd, projectName)) {
		log.Fatal(fmt.Sprintf("Project with name %s already exists", projectName))
	}

	statikFS := getFs()

	// read and write webpack
	webpackPath := "/config/webpack/webpack.dev.js"
	webpack := readContent(webpackPath, statikFS)
	webpack = replaceProjectName(webpack, projectName, 1)

	// read app.tsx
	apptsxPath := "/src/app.tsx"
	appTsx := readContent(apptsxPath, statikFS)
	appTsx = replaceProjectName(appTsx, projectName, 1)

	// read index.tsx
	indexTsxPath := "/src/index.tsx"
	indexTsx := readContent(indexTsxPath, statikFS)
	indexTsx = replaceProjectName(indexTsx, projectName, 1)

	// read copy files js
	copyFilePath := "/copy.files.js"
	copyFile := readContent(copyFilePath, statikFS)
	copyFile = replaceProjectName(copyFile, projectName, 2)

	// read package.json
	packageJsonPath := "/package.json"
	packageJson := readContent(packageJsonPath, statikFS)
	packageJson = replaceProjectName(packageJson, projectName, 2)

	// read tsconfig
	tsConfigPath := "/copy.files.js"
	tsConfig := readContent(tsConfigPath, statikFS)
	tsConfig = replaceProjectName(tsConfig, projectName, 2)

	// read services
	servicePath := "/src/services/window.postmessage.service.ts"
	service := readContent(servicePath, statikFS)
	service = replaceProjectName(service, projectName, 1)

	// read utils
	utilsPath := "/src/utils/types.ts"
	utils := readContent(utilsPath, statikFS)
	utils = replaceProjectName(utils, projectName, 1)

	// write files now
	// create folder fist
	projectPath := path.Join(cwd, projectName)
	createFolder(projectPath)
	// write config
	configPath := path.Join(projectPath, "config")
	createFolder(configPath)
	webpackFolderPath := path.Join(configPath, "webpack")
	createFolder(webpackFolderPath)
	// write webpack now
	writeContent(path.Join(webpackFolderPath, "webpack.dev.js"), webpack)

	// now src files
	srcPath := path.Join(projectPath, "src")
	createFolder(srcPath)
	writeContent(path.Join(srcPath, "App.tsx"), appTsx)
	writeContent(path.Join(srcPath, "Index.tsx"), indexTsx)

	// write service
	servicePathDir := path.Join(srcPath, "services")
	createFolder(servicePathDir)
	writeContent(path.Join(servicePathDir, "window.postmessage.service.ts"), service)

	// write service
	utilsDir := path.Join(srcPath, "utils")
	createFolder(utilsDir)
	writeContent(path.Join(utilsDir, "types.ts"), utils)

	// write root level files
	writeContent(path.Join(projectPath, "copy.files.js"), copyFile)
	writeContent(path.Join(projectPath, "package.json"), packageJson)

}
