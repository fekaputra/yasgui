package com.data2semantics.yasgui.shared.autocompletions;

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

import java.io.Serializable;

public class AutocompleteKeys implements Serializable {

	private static final long serialVersionUID = -1550708057486559219L;
	
	public static String REQUEST_QUERY = "q";
	public static String REQUEST_TYPE = "type";
	public static String REQUEST_METHOD = "method";
	public static String REQUEST_MAX_RESULTS = "max";
	public static String REQUEST_ENDPOINT = "endpoint";
	public static String REQUEST_COMPLETIONS = "completions";
	
	
	public static String TYPE_PROPERTY = "property";
	public static String TYPE_CLASS = "class";
	
	public static String RESPONSE_METHOD_QUERY_RESULTS = "queryResults";
	public static String RESPONSE_METHOD_QUERY_ANALYSIS = "query";
	
	public static String RESPONSE_RESULT_SIZE = "resultSize";
	public static String RESPONSE_RESULTS = "results";
	public static String RESPONSE_STATUS = "status";
	public static String RESPONSE_STATUS_TEXT = "text";
	public static String RESPONSE_STATUS_SUBJECT = "subject";
	public static String RESPONSE_STATUS_LEVEL = "level";
}
