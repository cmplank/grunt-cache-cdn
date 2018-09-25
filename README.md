# grunt-cache-cdn

> Download cdn libraries for local use (e.g. unit tests). Define your cdn libs in one place and write the references into your html. Wrapper for the cache-cdn library.

## Getting Started
This plugin requires Grunt `^1.0.0` and Node `^7.0.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-cache-cdn --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-cache-cdn');
```

## Overview
In your project's Gruntfile, add a section named `cache_cdn` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  cache_cdn: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
      files: {
        'dist/index.html': ['app/index.html']
      }
    },
  },
});
```

Then create a `cdn.json` file in the root of your project.

```json
{
    "js": {
        "replaceString": "<!-- cdn-js-libs -->",
        "replaceTemplate": "<script src='@' defer></script>",
        "downloadDirectory": "cdn/js",
        "dependencies": [
            "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"
        ]
    },
    "css": {
        "replaceString": "<!-- cdn-css-libs -->",
        "replaceTemplate": "<link href='@'>",
        "downloadDirectory": "cdn/css",
        "dependencies": [
            "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        ]
    }
}
```

In your index.html, add comments to be replaced with cdn references (use `replaceTemplate` value from `cdn.json`)

```html
<html>
<head>
    <!-- cdn-js-libs -->
    <!-- cdn-css-libs -->
</head>
<body> ... </body>
</html>
```

This results in the cdn files being downloaded to the cdn/js and cdn/css libraries respectively. The dist/html file will look like this:

```html
<html>
<head>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js' defer></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js' defer></script>
    <link href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'>
</head>
<body> ... </body>
</html>
```

As an additional note, when you download the cdn libraries, a `cdn-lock.json` file is created to keep track of versions and make sure downloads are not attempted when they are not needed.

## Grunt Options

### options.downloadLibs
Type: `boolean`
Default Value: `true`

Flag for enabling/disabling the downloading of cdn dependencies.

### options.configFile
Type: `string`
Default Value: `cdn.json`

Allows an alternate location and/or name for cdn.json file.

## Options for cdn.json File

### replaceString
Type: `string`
Example: `"<!-- cdn-js-libs -->"`

A string token which will be found in the sourceFile and replaced with an array of "replaceTemplate" values before being written to the destinationFile.

### replaceTemplate
Type: `string`
Example: `"<script src='@' defer></script>"`

The value of replaceTemplate will be used to generate each needed cdn tag in your html file. As "dependencies" are iterated over, the `@` symbol is replaced with each dependency url.

### downloadDirectory
Type: `string`
Example: `cdn/js`

Source html file which contains a replaceString matching that in cdn.json.

### dependencies
Type: `array`
Example: `["https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"]`

Array full of urls to cdn libraries. In the event that you end up with two files with the same name being downloaded into the same directory (e.g. cdn/js), you can replace one of the strings with an object that has `url` and `filename` properties. The url will be the same as before, but you choose the alternate filename you want to use. The following is an example:

```javascript
    ...
        "dependencies": [
            {"url": "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.0/jquery.min.js", "filename": "jquery2.min.js"},
            "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"
        ]
    ...
```

## Usage Examples

### Default Options
In this example, no options are passed. Files from the `cdn.json` file that you put in your project will be downloaded and written to the index.html file.

```js
grunt.initConfig({
  cache_cdn: {
    options: {},
    main: {
      files" {
        'dist/index.html': ['app/index.html']
      }
    },
  },
});
```

### Custom Options
In this example, an alternately located `cdn.json` file is specified. Behavior would otherwise be the same as before except that the downloadLibs option is specified. This simply stops the downloading of libraries defined in `cdn.json` but otherwise processes as usual.

```js
grunt.initConfig({
  cache_cdn: {
    options: {
      configFile: 'config/cdn.json',
      downloadLibs: false
    },
    main: {
      files" {
        'dist/index.html': ['app/index.html']
      }
    },
  },
});
```


## Acknowledgements

I want to give a special thanks to F1LT3R as this project was heavily inspired by [grunt-cdn-switch](https://github.com/F1LT3R/grunt-cdn-switch) and to dimmreaper who [forked that repo](https://github.com/dimmreaper/grunt-cdn-switch) to better serve my needs.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.0 - Initial creation
