export const markdownCss = `
/* cyrillic-ext */
pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#383a42;background:#fafafa}.hljs-comment,.hljs-quote{color:#a0a1a7;font-style:italic}.hljs-doctag,.hljs-formula,.hljs-keyword{color:#a626a4}.hljs-deletion,.hljs-name,.hljs-section,.hljs-selector-tag,.hljs-subst{color:#e45649}.hljs-literal{color:#0184bb}.hljs-addition,.hljs-attribute,.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#50a14f}.hljs-attr,.hljs-number,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-pseudo,.hljs-template-variable,.hljs-type,.hljs-variable{color:#986801}.hljs-bullet,.hljs-link,.hljs-meta,.hljs-selector-id,.hljs-symbol,.hljs-title{color:#4078f2}.hljs-built_in,.hljs-class .hljs-title,.hljs-title.class_{color:#c18401}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}.hljs-link{text-decoration:underline}
code.hljs{background:rgba(69, 77, 89, 0.04);padding: 5px 8px;}
.hljs code{color:#4c4c4c;}
@font-face {
	font-family: "Vollkorn";
	font-style: italic;
	font-weight: 400;
	src: url(https://fonts.gstatic.com/s/vollkorn/v17/0yb7GDoxxrvAnPhYGxksWEIeqTo29TfO-Q.woff2)
		format("woff2");
	unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
		U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
	font-family: "Vollkorn";
	font-style: italic;
	font-weight: 400;
	src: url(https://fonts.gstatic.com/s/vollkorn/v17/0yb7GDoxxrvAnPhYGxksWEseqTo29TfO-Q.woff2)
		format("woff2");
	unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek */
@font-face {
	font-family: "Vollkorn";
	font-style: italic;
	font-weight: 400;
	src: url(https://fonts.gstatic.com/s/vollkorn/v17/0yb7GDoxxrvAnPhYGxksWEweqTo29TfO-Q.woff2)
		format("woff2");
	unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
	font-family: "Vollkorn";
	font-style: italic;
	font-weight: 400;
	src: url(https://fonts.gstatic.com/s/vollkorn/v17/0yb7GDoxxrvAnPhYGxksWEAeqTo29TfO-Q.woff2)
		format("woff2");
	unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,
		U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
	font-family: "Vollkorn";
	font-style: italic;
	font-weight: 400;
	src: url(https://fonts.gstatic.com/s/vollkorn/v17/0yb7GDoxxrvAnPhYGxksWEEeqTo29TfO-Q.woff2)
		format("woff2");
	unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
		U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
	font-family: "Vollkorn";
	font-style: italic;
	font-weight: 400;
	src: url(https://fonts.gstatic.com/s/vollkorn/v17/0yb7GDoxxrvAnPhYGxksWE8eqTo29Tc.woff2)
		format("woff2");
	unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
		U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
		U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
	font-family: "Vollkorn";
	font-style: italic;
	font-weight: 700;
	src: url(https://fonts.gstatic.com/s/vollkorn/v17/0yb7GDoxxrvAnPhYGxksWEIeqTo29TfO-Q.woff2)
		format("woff2");
	unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
		U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
	font-family: "Vollkorn";
	font-style: italic;
	font-weight: 700;
	src: url(https://fonts.gstatic.com/s/vollkorn/v17/0yb7GDoxxrvAnPhYGxksWEseqTo29TfO-Q.woff2)
		format("woff2");
	unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek */
@font-face {
	font-family: "Vollkorn";
	font-style: italic;
	font-weight: 700;
	src: url(https://fonts.gstatic.com/s/vollkorn/v17/0yb7GDoxxrvAnPhYGxksWEweqTo29TfO-Q.woff2)
		format("woff2");
	unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
	font-family: "Vollkorn";
	font-style: italic;
	font-weight: 700;
	src: url(https://fonts.gstatic.com/s/vollkorn/v17/0yb7GDoxxrvAnPhYGxksWEAeqTo29TfO-Q.woff2)
		format("woff2");
	unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,
		U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
	font-family: "Vollkorn";
	font-style: italic;
	font-weight: 700;
	src: url(https://fonts.gstatic.com/s/vollkorn/v17/0yb7GDoxxrvAnPhYGxksWEEeqTo29TfO-Q.woff2)
		format("woff2");
	unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
		U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
	font-family: "Vollkorn";
	font-style: italic;
	font-weight: 700;
	src: url(https://fonts.gstatic.com/s/vollkorn/v17/0yb7GDoxxrvAnPhYGxksWE8eqTo29Tc.woff2)
		format("woff2");
	unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
		U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
		U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
	font-family: "Vollkorn";
	font-style: normal;
	font-weight: 400;
	src: url(https://fonts.gstatic.com/s/vollkorn/v17/0yb9GDoxxrvAnPhYGxkkaE0Urhg0xTY.woff2)
		format("woff2");
	unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
		U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
	font-family: "Vollkorn";
	font-style: normal;
	font-weight: 400;
	src: url(https://fonts.gstatic.com/s/vollkorn/v17/0yb9GDoxxrvAnPhYGxktaE0Urhg0xTY.woff2)
		format("woff2");
	unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek */
@font-face {
	font-family: "Vollkorn";
	font-style: normal;
	font-weight: 400;
	src: url(https://fonts.gstatic.com/s/vollkorn/v17/0yb9GDoxxrvAnPhYGxkqaE0Urhg0xTY.woff2)
		format("woff2");
	unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
	font-family: "Vollkorn";
	font-style: normal;
	font-weight: 400;
	src: url(https://fonts.gstatic.com/s/vollkorn/v17/0yb9GDoxxrvAnPhYGxkmaE0Urhg0xTY.woff2)
		format("woff2");
	unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,
		U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
	font-family: "Vollkorn";
	font-style: normal;
	font-weight: 400;
	src: url(https://fonts.gstatic.com/s/vollkorn/v17/0yb9GDoxxrvAnPhYGxknaE0Urhg0xTY.woff2)
		format("woff2");
	unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
		U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
	font-family: "Vollkorn";
	font-style: normal;
	font-weight: 400;
	src: url(https://fonts.gstatic.com/s/vollkorn/v17/0yb9GDoxxrvAnPhYGxkpaE0Urhg0.woff2)
		format("woff2");
	unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
		U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
		U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
	font-family: "Vollkorn";
	font-style: normal;
	font-weight: 700;
	src: url(https://fonts.gstatic.com/s/vollkorn/v17/0yb9GDoxxrvAnPhYGxkkaE0Urhg0xTY.woff2)
		format("woff2");
	unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
		U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
	font-family: "Vollkorn";
	font-style: normal;
	font-weight: 700;
	src: url(https://fonts.gstatic.com/s/vollkorn/v17/0yb9GDoxxrvAnPhYGxktaE0Urhg0xTY.woff2)
		format("woff2");
	unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek */
@font-face {
	font-family: "Vollkorn";
	font-style: normal;
	font-weight: 700;
	src: url(https://fonts.gstatic.com/s/vollkorn/v17/0yb9GDoxxrvAnPhYGxkqaE0Urhg0xTY.woff2)
		format("woff2");
	unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
	font-family: "Vollkorn";
	font-style: normal;
	font-weight: 700;
	src: url(https://fonts.gstatic.com/s/vollkorn/v17/0yb9GDoxxrvAnPhYGxkmaE0Urhg0xTY.woff2)
		format("woff2");
	unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,
		U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
	font-family: "Vollkorn";
	font-style: normal;
	font-weight: 700;
	src: url(https://fonts.gstatic.com/s/vollkorn/v17/0yb9GDoxxrvAnPhYGxknaE0Urhg0xTY.woff2)
		format("woff2");
	unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
		U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
	font-family: "Vollkorn";
	font-style: normal;
	font-weight: 700;
	src: url(https://fonts.gstatic.com/s/vollkorn/v17/0yb9GDoxxrvAnPhYGxkpaE0Urhg0.woff2)
		format("woff2");
	unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
		U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
		U+FEFF, U+FFFD;
}

img {
	max-width: 100%;
}

table {
	width: 100%;
}

table,
th,
td {
	padding: 5px;
}
html,
body {
	padding: 1em;
	margin: auto;
	background: #fefefe;
}
body {
	font: "Vollkorn", Palatino, Times;
	color: #333;
	line-height: 1.4;
	text-align: justify;
}
header,
nav,
article,
footer {
	width: 700px;
	margin: 0 auto;
}
article {
	margin-top: 4em;
	margin-bottom: 4em;
	min-height: 400px;
}
footer {
	margin-bottom: 50px;
}
video {
	margin: 2em 0;
	border: 1px solid #ddd;
}

nav {
	font-size: 0.9em;
	font-style: italic;
	border-bottom: 1px solid #ddd;
	padding: 1em 0;
}
nav p {
	margin: 0;
}

/* Typography
-------------------------------------------------------- */

h1 {
	margin-top: 0;
	font-weight: normal;
}
h2 {
	font-weight: normal;
}
h3 {
	font-weight: normal;
	font-style: italic;
	margin-top: 3em;
}
p {
	margin-top: 0;
	-webkit-hypens: auto;
	-moz-hypens: auto;
	hyphens: auto;
}
ul {
	list-style: square;
	padding-left: 1.2em;
}
ol {
	padding-left: 1.2em;
}
blockquote {
	margin-left: 1em;
	padding-left: 1em;
	border-left: 1px solid #ddd;
}
a {
	color: #2484c1;
	text-decoration: none;
}
a:hover {
	text-decoration: underline;
}
a img {
	border: none;
}
h1 a,
h1 a:hover {
	color: #333;
	text-decoration: none;
}
hr {
	color: #ddd;
	height: 1px;
	margin: 2em 0;
	border-top: solid 1px #ddd;
	border-bottom: none;
	border-left: 0;
	border-right: 0;
}
p#heart {
	font-size: 2em;
	line-height: 1;
	text-align: center;
	color: #ccc;
}
.red {
	color: #b50000;
}

/* Home Page
--------------------------- */

body#index li {
	margin-bottom: 1em;
}

/* iPad
-------------------------------------------------------- */
@media only screen and (max-device-width: 1024px) {
	body {
		font-size: 16px;
		line-height: 1.4;
	}
} /* @iPad */

/* iPhone
-------------------------------------------------------- */
@media only screen and (max-device-width: 480px) {
	body {
		text-align: left;
	}
	article,
	footer {
		width: auto;
	}
	article {
		padding: 0 10px;
	}
} /* @iPhone */
`;
