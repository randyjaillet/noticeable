# Noticeable

Noticeable is a basic jQuery-dependant notification plugin.

## Usage

Include jQuery and the Noticeable script, then instantiate new notifications with the `new` keyword.

```
<script type="text/javascript" src="//code.jquery.com/jquery-1.12.0.min.js"></script>
<script type="text/javascript" src="/js/jquery.noticeable.js"></script>
<script>
$(
	function () {

		var $n = new Noticeable("Nailed it!");

	}
)
</script>
```

## Options

Noticeable takes options in an object as the second argument at instantiation.

## `type`

This can be any string. It will be inserted as a class name for styling purposes. In the default css, supported types include "success", "info", "warning", and "error".

## `callbacks`

This should be an object. Supported properties are `create` and `destroy`, which should both be functions that will be run when the Noticeable notifications are instantiated and destroyed, respectively.

## `autoDestroy`

This should be either an int or `false`. If `false`, the notification will not self-destruct and will have to be manually dismissed by the user. If an int is provided, the notification will self-destruct after the provided number of milliseconds.

## `links`

This should be an array of objects, one for each link to be appended to the notification. Supported object properties are:

* ### `href`

	The href for the link. If not provided, "#" will be used.

* ### `onClick`

	A function to run when the link is clicked. preventDeafult() should be used in the provided function.

* ### `text`

	The text inside the link tag that will display in the Noticeable.

## Methods

### `destroy()`

Fades and removes the notification.

## Public Properties

### `msg`

The argument provided as the notification message at instantiation.

### `type`

The `type` option provided at instantiation.

### `ele`

The actual `div.opti` as a jQuery object.