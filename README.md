# hyper-media-control-foobar2000-httpcontrol

![npm](https://img.shields.io/npm/v/hyper-media-control-foobar2000-httpcontrol.svg)
[![License](https://img.shields.io/github/license/OrionNebula/hyper-media-control-foobar2000-httpcontrol.svg)](LICENSE)
[![hyper](https://img.shields.io/badge/Hyper-v2.0.0-brightgreen.svg)](https://github.com/zeit/hyper/releases/tag/2.0.0)
[![GitHub issues](https://img.shields.io/github/issues/OrionNebula/hyper-media-control-foobar2000-httpcontrol.svg)](https://github.com/OrionNebula/hyper-media-control-foobar2000-httpcontrol/issues)
[![foobar2000 homepage](https://www.foobar2000.org/button-small.png)](https://www.foobar2000.org/ "foobar2000 homepage")

> Extend [`hyper-media-control`](https://github.com/OrionNebula/hyper-media-control) with support for [foobar2000](https://www.foobar2000.org/).

## Installation

Add `hyper-media-control` and `hyper-media-control-foobar2000-httpcontrol` to your Hyper configuration.

Install the [`foo-httpcontrol`](https://hydrogenaud.io/index.php/topic,62218.0.html) component and the [`ajquery`](https://bitbucket.org/oblikoamorale/foo_httpcontrol/downloads/) template.

## Configuration

`hyper-media-control-foobar2000-httpcontrol` defines the following configuration options:

```js
module.exports = {
    config: {
        ...
        hyperMedia: {
            ...
            foobar: {
                port: 8888 // The port used to communicate with foobar2000
            }
            ...
        }
    }
}
```