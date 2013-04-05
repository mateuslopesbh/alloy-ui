AUI.add("aui-ace-autocomplete-base",function(d){var h=d.Lang,c=d.Array,i=d.Do,p=d.DOM,e="exec",m="fillMode",n="host",b="insertText",g="processor",a=1,k=0,l=-1,j=0,o="ace-autocomplete-base";var f=function(){};f.prototype={initializer:function(){var q=this;q._editorCommands=[];d.after(q._bindUIACBase,q,"renderUI");var r=q.get(g);if(r&&!r.get(n)){r.set(n,q);}q._onResultsErrorFn=d.bind("_onResultsError",q);q._onResultsSuccessFn=d.bind("_onResultsSuccess",q);},_addSuggestion:function(x){var z=this;z._lockEditor=true;var v=z._getEditor();var t=z.get(g).getSuggestion(z._matchParams.match,x);if(z.get(m)===f.FILL_MODE_OVERWRITE){var w=z._matchParams;var y=w.row;var s=w.column-w.match.content.length;var q=v.getCursorPosition();var r=require("ace/range").Range;var u=new r(y,s,q.row,q.column);v.getSession().replace(u,t);}else{v.insert(t);}v.focus();z._lockEditor=false;z.fire("addSuggestion",t);return new i.Halt(null);},_bindUIACBase:function(){var q=this;q.publish("cursorChange",{defaultFn:q._defaultCursorChangeFn});var r=q._getEditor();q._onChangeFn=d.bind("_onEditorChange",q);r.on("change",q._onChangeFn);r.commands.addCommand({name:"showAutoComplete",bindKey:d.merge(q.get("showListKey"),{sender:"editor|cli"}),exec:function(u,t,v){var s=r.getCursorPosition();q._processAutoComplete(s.row,s.column);}});q._onEditorChangeCursorFn=d.bind("_onEditorChangeCursor",q);r.getSelection().on("changeCursor",q._onEditorChangeCursorFn);q.on("destroy",q._destroyUIACBase,q);},_defaultCursorChangeFn:function(u){var r=this;var t=r._getEditor();var q=t.getCursorPosition();var v=q.row;var s=q.column;var w=r._matchParams;if(v!==w.row||s<w.match.start){r.fire("cursorOut");}},_destroyUIACBase:function(){var q=this;var r=q._getEditor();r.commands.removeCommand("showAutoComplete");r.removeListener("change",q._onChangeFn);r.getSelection().removeListener("changeCursor",q._onEditorChangeCursorFn);q._removeAutoCompleteCommands();},_getEditor:function(){var q=this;return q.get(n).getEditor();},_filterResults:function(v,s){var q=this;var u=q.get("filters");for(var r=0,t=u.length;r<t;++r){s=u[r].call(q,v,s.concat());if(!s.length){break;}}var w=q.get("sorters");for(r=0,t=w.length;r<t;++r){s=w[r].call(q,v,s.concat());if(!s.length){break;}}return s;},_handleEnter:function(s){var q=this;if(s==="\n"||s==="\t"){var r=q._getSelectedEntry();return q._addSuggestion(r);}},_onEditorChange:function(v){var q=this;var w=v.data;var x=w.action;if(!q._lockEditor&&(x===b||x==="removeText")){var t=w.range;var u=t.start.column;var s=t.end.row;var r=t.start.row;if(x===b&&r===s){q._processAutoComplete(r,u+1);}q.fire(x,{column:u,dataRange:t,endRow:s,startRow:r});}},_onEditorChangeCursor:function(r){var q=this;q.fire("cursorChange",q._getEditor().getCursorPosition());},_onResultsError:function(r){var q=this;q.fire("resultsError",r);},_onResultsSuccess:function(r){var q=this;q.set("results",r);},_overwriteCommands:function(){var r=this;var s=r._getEditor();var q=s.commands.commands;r._editorCommands.push(i.before(r._handleEnter,s,"onTextInput",r),i.before(r._handleKey,q["golinedown"],e,r,40),i.before(r._handleKey,q["golineup"],e,r,38),i.before(r._handleKey,q["gotoend"],e,r,35),i.before(r._handleKey,q["gotolineend"],e,r,35),i.before(r._handleKey,q["gotolinestart"],e,r,36),i.before(r._handleKey,q["gotopagedown"],e,r,34),i.before(r._handleKey,q["gotopageup"],e,r,33),i.before(r._handleKey,q["gotostart"],e,r,36));},_phraseMatch:function(s,r,q){if(!s){return r;}if(!q){s=s.toLowerCase();}return c.filter(r,function(t){return(q?t:t.toLowerCase()).indexOf(s)!==-1;});},_processAutoComplete:function(x,s){var w=this;var r=s;var u=w._getEditor();var y=u.getSession().getLine(x);y=y.substring(0,s);var q=w.get(g);var t=q.getMatch(y);var v;if(h.isObject(t)){v=u.renderer.textToScreenCoordinates(x,s);v.pageX+=p.docScrollX();v.pageY+=p.docScrollY();w._matchParams={column:s,match:t,row:x};q.getResults(t,w._onResultsSuccessFn,w._onResultsErrorFn);}w.fire("match",{column:s,coords:v,line:y,match:t,row:x});},_removeAutoCompleteCommands:function(){var q=this;(new d.EventHandle(q._editorCommands)).detach();q._editorCommands.length=0;},_sortAscLength:function(s,r,q){return r.sort(function(v,u){var t=0;if(!q){v=v.toLowerCase();u=u.toLowerCase();}var x=v.indexOf(s);var w=u.indexOf(s);if(x===0&&w===0){t=v.localeCompare(u);}else{if(x===0){t=-1;}else{if(w===0){t=1;}else{t=v.localeCompare(u);}}}return t;});},_validateFillMode:function(q){return(q===f.FILL_MODE_OVERWRITE||q===f.FILL_MODE_INSERT);}};f.FILL_MODE_INSERT=a;f.FILL_MODE_OVERWRITE=k;f.NAME=o;f.NS=o;f.ATTRS={fillMode:{validator:"_validateFillMode",value:f.FILL_MODE_OVERWRITE},filters:{valueFn:function(){var q=this;return[q._phraseMatch];}},processor:{validator:function(q){return h.isObject(q)||h.isFunction(q);}},showListKey:{validator:h.isObject,value:{mac:"Alt-Space",win:"Ctrl-Space"}},sorters:{valueFn:function(){var q=this;return[q._sortAscLength];}}};d.AceEditor.AutoCompleteBase=f;},"@VERSION@",{requires:["aui-ace-editor"]});