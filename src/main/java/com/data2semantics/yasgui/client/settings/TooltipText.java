package com.data2semantics.yasgui.client.settings;


/*
 * #%L
 * YASGUI
 * %%
 * Copyright (C) 2013 Laurens Rietveld
 * %%
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * #L%
 */

public enum TooltipText {
	GITHUB_ICON("Found bugs? Miss any features? Submit an issue on GitHub"),
	TOOLTIP_BUTTON("Click this button to show these hints again"),
	CONFIG_MENU("<ul style=\"padding-left:14px;margin: 1px;\">" +
			"<li>Update prefixes or endpoints (CKAN) list</li>" +
			"<li>Supported YASGUI features</li>" +
			"<li>Login using OpenID</li>" +
			"</ul>"),
	TAB_SELECTION("Double click to rename. Right click for tab options"),
	ENDPOINT_SEARCH_ICON("Search for endpoints"),
	QUERY_PREFIXES_AUTOCOMPLETE("Start typing the PREFIX definition to get an autocompletion list of prefixes.<br>Prefix missing? Add your prefix to <a href=\"http://prefix.cc/\" target=\"_blank\">prefix.cc</a>, and refresh autocompletion list (via config menu)"),
	QUERY_CONFIG_MENU("Advanced options which you normally wont need, including:" +
			"<ul style=\"padding-left:14px;margin: 1px;\">\n" + 
			"<li>Change request method (POST / GET)</li>\n" + 
			"<li>Add more query arguments</li>\n" + 
			"<li>Change requested content (XML/JSON/Turtle)</li>\n" + 
		"</ul>"),
	LINK_GENERATOR("Share your queries with others by <br>generating a YASGUI link for them"),
	ADD_TO_BOOKMARKS("Add queries as a bookmark (requires login)"),
	ATTRIBUTION("YASGUI is developed by <a href='http://laurensrietveld.nl' target='_blank'>Laurens Rietveld</a> and funded by <a href='http://data2semantics.org' target='_blank'>Data2Semantics</a>");

	private String text;
	private String subject;

	private TooltipText(String text) {
		this.text = text;
	}
	private TooltipText(String text, String subject) {
		this.text = text;
		this.subject = subject;
	}
	public String getText() {
		return this.text;
	}
	public String getSubject() {
		return this.subject;
	}
}
