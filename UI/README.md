# UI-Group
The jade templating engine is designed primarily for server-side templating.

It can be used just as a shorthand for HTML, but we're more interested in its potential for dynamic templating with logic.


## The basics

#### Files

```
npm install jade --save
```

Jade files have the extension .jade

#### Whitespace Sensitivity
Jade is whitespace sensitive - what does that mean????

It
	Means
		You
			Must
				Take
					Care
						With
							Your
								Indenting
							As
						It
					Infers
				What
			You
		Want
	Through
Spacing


#### Writing Jade
Basic ways of writing in Jade (sans-logic):

```
	h1 Welcome to Jade
	h1
		| Welcome to Jade
	h1.
		Welcome to Jade
```
```
	a(href="google.com", id="hi") Welcome to Jade
```


## JS+Jade Basics

In order to process your templates and output HTML from your jadefiles, a small amount of work is needed in your js file:

```
// Requiring our modules
var jade 	= require("jade");
var path 	= __dirname + "/" + filename.jade;
var fn 		= jade.compileFile(path, {filename: path});

// Then if we want to send the client the page:
res.write(fn({name: "Asim", friends: 0, m8s: []}));
```

The important part here is jade.compileFile, which returns a function into which you pass your data. Alternatively, you can immediately render the file with: 

```
res.renderFile({name: "James", friends: infinity, m8s: [{name: "Asim"}, ...]});
``` 

And then in our jadefile, we'd have something like

```
doctype html
body
	div
		h1 #{name}
	div
		p(class=friends) #{friends}
	if m8s
		ul
			each m8 in m8s
				li #{m8.name}
```

OUTPUT:
```
<body>
	<div>
		<h1> James </h1>
	</div>
	<div>
		<p class=friends> infinity </p>
		<ul>
			<li> Asim </li>
			...
		</ul>
	</div>
</body>
```

## Mixins

These let you create recyclable blocks of jade:

Creation
MIXINS.JADE
```
mixin list(name)
	h1 #{name}
```

Usage
MAIN.JADE
```
include ./mixins

body
	div
		+list("James")
		+list("Asim")
```

OUTPUT:
```
<body>
	<div>
		<h1> James </h1>
		<h1> Asim </h1>
	</div>
</body>
```

##Extends

Extend allow templates to extend a layout or parent template. It can override certain pre-defined blocks of content. Children blocks override parent blocks

LAYOUT.JADE
```
head
	block title
		title Default Title
body 
	block content
		h1 hello m8
```

INDEX.JADE
```
extends ./layout.jade

block title
	title My m8s title

```

OUTPUT
```
<head>
	<title> My m8s title </title>
</head>
<body>
	<h1> hello m8 </h1>
</body>
```