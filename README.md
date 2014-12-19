mct-rewrite-css-url-paths
=======================

## Overview

This Mimosa-Combine Transform package will find image URLs within stylesheets and replace the URL with a base64 representation of the linked image.

For information on mimosa-combine transforms, checkout the [mimosa-combine repo](https://github.com/dbashford/mimosa-combine#transform-functions).

## Installation

From the root of your Mimosa project, type `npm install mct-convert-image-to-base64 --save`

## Usage

Add this module as a combine transform in the `mimosa-config` file.
```javascript
combine: {
    folders: [
      {
        transforms: [
          require('mct-convert-image-to-base64')
        ]
```
