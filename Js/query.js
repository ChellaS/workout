"use strict";
var queries = {
    "M1":{
        "question": "Test 1. This is my first Question",
        "reply": "This is my first Reply",
        "problem_type": "F05",
        "query_type": 0,
        "status": "closed"
    },
    "M2":{
        "question": "Test 2",
        "reply": "This is my first Reply LHLHLHLH",
        "problem_type": "F05",
        "query_type": 1,
        "status": "open"
    },
    "M3":{
        "question": "Test 3",
        "reply": "",
        "problem_type": "F10",
        "query_type": 2,
        "status": "open"
    },
    "total_query": 3,
    "answered": 0,
    "deleted_query": 0,
    "mode": "raise"       
};

var problemAndQueryTypes = [
    {   
        "problem_type":"Query for LSM",
        "id": "F05",
        "queries" :[
            "Problem 1",
            "Problem 2",
            "Problem 3"
        ]
    },
    {
        "problem_type":"Miscellenous",
        "id":"F10",
        "queries":[
            "Problem 4",
            "Problem 5",
            "Problem 6"
        ]
    }
];

var message = {
    problemtype: {
        empty: "Problem type cannot be empty!"
    },
    question: {
        empty: "Question cannot be empty!"
    },
    querytype: {
        empty: "Query type cannot be empty!"
    },
    id: {
        empty: "ID cannot be empty!"
    }
};

 var query = [];
 query.func = {
   getData: function() {
    return queries;
   },
    addQuery: function(question, optional) {
        var query = [], label = "", newQuery = {},
        defaultValue = document.getElementById('question').getAttribute('placeholder'),
        key = "";
        this.isEmpty(question, message.question.empty);
        question = (question === defaultValue) ? "" : question;
        this.data.total_query += 1;
        label = "M" + this.data.total_query;
        query = {
            "question" : question,
            "reply": "",
            "status": "initial"
        };
        
        for (key in optional) {
            query[key] = optional[key];
        };

        this.data[label] = query;
    },
    isAnyQueryFoundUnsaved: function() {
        var key = "", queries = this.data, initial = "";
        for (key in queries) {
            initial = queries[key].status;
            if (initial === "initial") {
                return {"status":true, "msg":"Sorry! Already created query " + key + " not saved"};
            };
        }

        return {"status": false, "msg": ""};
    },
    updateQuery: function(id, optional) {
        this.isEmpty(id, message.id.empty);
        var query = "", 
        queryStatus = this.data[id].status,
        key = "";
        if (this.isAllowedToUpdate(queryStatus) === false) {
            this.showMessage("Sorr! This " + id + " already " + queryStatus + ".");
            return false;
        };

        query = this.data[id];
        for (key in optional ) {
            if (typeof query[key] !== "undefined") {
                query[key] = optional[key];
            }
        }
    },
    isAllowedToUpdate: function (value) {
        if (value == "closed" 
            || value == "deleted") {
            return false;
        };

        return true;
    },
    deleteQuery: function(id) {
        this.isEmpty(id, message.id.empty);
        var queryStatus = this.data[id].status;
        if ( this.isAllowedToUpdate(queryStatus) === false) {
            this.showMessage("Sorry! This " + id + " query already " + queryStatus + ".");
            return false;
        };

        this.updateQuery(id, {"question": "This query has been deleted"});
        this.data[id]['status'] = "deleted";
        this.data.deleted_query += 1;
    },
    isEmpty: function(value, message) {
        var value = value.trim();
        if (typeof value === undefined || value == "") {
            throw (message);
            return;
        };
    },
    showMessage: function(msg) {
        alert(msg);
    },
    init: function() {
        this.data = this.getData();
        // this.updateQuery("3", {"question" : "UpdatedQuery"});
        // this.deleteQuery("2");
        // console.log(this.data);
   }
};

query.view = {
   loadQueryLabel: function(label, selector) {
        var list = "",
        queryLength = query.func.data.total_query,
        id = 0, className = "";
        selector = document.getElementById(selector);
        for (var i = 1; i <= queryLength; i++) {
            className = query.func.data[label+i].status;
            list = document.createElement("li");
            list.classList.add(className);
            selector.appendChild(list).innerHTML = label + i;
            id++;
        };
    },
    addQueryLabel: function (label, selector) {
        var list = "",
        queryLength = query.func.data.total_query,
        id = 0, className = "", label = label + queryLength;
        selector = document.getElementById(selector);
        className = query.func.data[label].status;
        list = document.createElement("li");
        list.classList.add(className);
        selector.appendChild(list).innerHTML = label;
        this.setQueryLabel(list);
    },  
    loadQuestion: function(question, selector, status) {
        var questionNode = "",
        questionNode = document.getElementById("question");
        questionNode.value = question;
    },
    loadReply: function(reply, selector, status) {
        var answerNode = "",
        selector = document.getElementsByClassName(selector)[0];
        answerNode = selector.firstElementChild.getElementsByClassName("reply")[0].firstElementChild;
        answerNode.value = reply;
        this.setContentToEditor(reply);
    },
    setContentToEditor: function(value) {
        var editor = this.editor,
        setValue = function(editor, value){editor.val(value);};
        window.setTimeout(setValue(editor, value), 10); 
    },
    getReply: function() {
        var value = "";
        value = this.editor.val();
        return value;
    },
    getQuestion: function() {
        var value = "";
        value = document.getElementById('question').value;
        return value;
    },
    initProblemTypes: function(problemTypes, selector) {
        var node = document.getElementById(selector),
        childNode = "",
        problemTypeLength = problemTypes.length;
        node.innerHTML = "<option id='0' value=''>Please select problem type</option>";
        for (var i = 0; i < problemTypeLength; i++) { 
            childNode = document.createElement("option");
            node.appendChild(childNode).value = problemTypes[i].problem_type;
            node.appendChild(childNode).innerHTML = problemTypes[i].problem_type;
            node.appendChild(childNode).id = problemTypes[i].id;
        }
    },
    initQyeryType: function(problemTypes, id, selector) {
        var queryTypes = this.getQueryTypes(problemTypes, id);
        var node = document.getElementById(selector),
        childNode = "";
        document.getElementById(selector).innerHTML = "<option id='0' value=''>Please select Query type</option>";
        for (var i = 0; i < queryTypes.length; i++) {
            childNode = document.createElement("option");
            node.appendChild(childNode).value = queryTypes[i];
            node.appendChild(childNode).innerHTML = queryTypes[i];
            node.appendChild(childNode).id = i;
        }       
    },
    loadProblemType: function(problemTypeId, selector) {
        var problemType = "";
        this.removeAttributes("selected", selector);
        document.getElementById(problemTypeId).setAttribute("selected", "selected");
        this.initQyeryType(problemAndQueryTypes, problemTypeId, "query_types");
    },
    loadQueryType: function(queryTypeId, selector) {
        var queryType = this.problemType;
        this.removeAttributes("selected", "query_types");
        document.getElementById(queryTypeId).setAttribute("selected", "selected");
    },
    removeAttributes: function(attr, selector) {
        var optionLength = document.getElementById(selector).children.length,
        dropDownMenu = document.getElementById(selector).children;
        for (var i = 0; i < optionLength; i++) {
            dropDownMenu[i].removeAttribute(attr);    
        };
    },
    setEditorReadOnly: function(mode) {
        var editor = this.editor.editor,
        setReadOnly = function(editor, mode) {
            editor.setReadOnly(mode);
            },
        queryMode = query.func.data.mode.toLowerCase();
        
        if (queryMode !== 'reply') {
            mode = true;
        };

        window.setTimeout(setReadOnly(editor, mode), 10);
    },
    setEditor: function(editor, elem) {
        var config = {
            toolbar:
            [
                ['Bold', 'Italic', 'Superscript', 'Subscript', 'SpecialChar']
            ]
        };

        switch(editor) {
            case "ckeditor":
            this.editor = $(elem).ckeditor(config);
            break;
            case "ckfinder":
            this.editor = $(elem).ckfinder(config);
            break;
            default:
            this.editor = $(elem).ckeditor(config);
        }
    },
    getEditor: function() {
        return this.editor;
    },
    getQueryTypes: function(queries, id) {
        var queryLength = queries.length;
        for (var i = 0; i < queryLength; i++) {
            if (queries[i].id === id) {
                return queries[i].queries;
            };
        };
        return [];
    },
    setEditorMode: function(stat) {
        var state = false, 
        stat = (typeof stat === undefined) ? "closed": stat;
        if (stat === "closed" || stat === "deleted") {
            state = true;
        };

        this.setEditorReadOnly(state);
        this.setQuestionEditorReadOnly("question", state);
        this.setQuestionEditorReadOnly("problem_types", state);
        this.setQuestionEditorReadOnly("query_types", state);
    },
    setQuestionEditorReadOnly: function(id, state) {
        var mode = true, queryStatus = query.func.data.mode.toLowerCase();
        if (queryStatus === "raise") {
            mode = state;
        };

        if (mode === true) {
            document.getElementById(id).setAttribute("disabled", "disabled");
            return;
        };

        document.getElementById(id).removeAttribute("disabled");
    },
    setQueryLabel: function(elem) {
        this.removeClassSelected();
        elem.classList.add("selected");
    },
    removeClassSelected: function() {
        var listElement = document.getElementById("query_list").children,
        elementLength = listElement.length;
        for (var i = 0; i < elementLength; i++) {
            if (typeof listElement[i].classList != "undefined") {
                listElement[i].classList.remove("selected");
            };
        }
    },
    getSelectedQueryListName: function() {
        var listName = "";
        listName = document.getElementById("query_list").getElementsByClassName("selected")[0].innerHTML;
        return listName.trim();
    },
    getSelectedQueryName: function(selector, _class) {
        var selectedNode = "", nodeValue = "";
        selectedNode = document.getElementById(selector).getElementsByClassName(_class);
        nodeValue = typeof selectedNode[0] == "undefined" ? "" : selectedNode[0].innerHTML;
        return nodeValue;
    },
    getProblemTypeId: function(selector) {
        var problemTypeNode = document.getElementById(selector);
        return problemTypeNode.options[problemTypeNode.selectedIndex].id;
    },
    init: function() { 
        var editorName = "ckeditor",
        elem = 'textarea#editor1';
        this.setEditor(editorName, elem);
    }
}

try {
    query.func.init();
    query.view.init();
    query.view.initProblemTypes(problemAndQueryTypes, "problem_types");
    query.view.loadQueryLabel("M", "query_list");
    query.view.loadQuestion(query.func.data.M1.question, "query_author", query.func.data.M1.status);
    query.view.loadReply(query.func.data.M1.reply, "query_author", query.func.data.M1.status);
    // query.view.setEditorMode();

document.getElementById("query_list").addEventListener("click", function(a) {
    var node = a.target.innerHTML, queryReply = "", queryQuestion = "", currentNode = "", updatedNode = "",
    selectedValue = query.view.getSelectedQueryName("query_list", "selected");
    if (selectedValue.trim() != "" 
        && (query.func.data[selectedValue].status == "saved" 
        || query.func.data[selectedValue].status == "open")) {
        queryReply = query.view.getReply();
        queryQuestion = query.view.getQuestion();
        query.func.updateQuery(selectedValue, {"reply": queryReply, "question": queryQuestion});
    };

    query.view.loadQuestion(query.func.data[node].question, "query_author", query.func.data[node].status);
    query.view.loadReply(query.func.data[node].reply, "query_author", query.func.data[node].status);
    query.view.setEditorMode(query.func.data[node].status);
    query.view.setQueryLabel(a.target);
    query.view.loadProblemType(query.func.data[node].problem_type, "problem_types");
    query.view.loadQueryType(query.func.data[node].query_type, "query_types");
}, false);

document.getElementById("create").addEventListener("click", function(a) {
    var item = 0, 
    unSavedQuery = query.func.isAnyQueryFoundUnsaved();
    if (unSavedQuery.status === true) {
        query.func.showMessage(unSavedQuery.msg);
        return;
    };

    query.view.initProblemTypes(problemAndQueryTypes, "problem_types");
    query.view.initQyeryType(problemAndQueryTypes, "", "query_types");
    query.func.addQuery("Please choose query", {"problem_type" : "0", "query_type" : 0});
    query.view.addQueryLabel("M", "query_list");
    item = "M" + query.func.data.total_query;
    query.view.loadQuestion(query.func.data[item].question, "query_author", query.func.data[item].status);
    query.view.loadReply(query.func.data[item].reply, "query_author", query.func.data[item].status);
    query.view.setEditorMode(true);
});

document.getElementById("delete_query").addEventListener("click", function(a) {
    var deletedItem = query.view.getSelectedQueryListName();
    query.func.deleteQuery(deletedItem);
    query.view.loadQuestion(query.func.data[deletedItem].question, "query_author", query.func.data[deletedItem].status);
});

document.getElementById("problem_types").addEventListener("change", function(e){
    var selectedId = e.target.options[e.target.selectedIndex].id;
    query.view.initQyeryType(problemAndQueryTypes, selectedId, "query_types");
});

document.getElementById('query_types').addEventListener("change", function(e){
    var queryId = "", queryValue = "", queryTypeId = "", optional = {}, problemTypeId = "";
    queryId = query.view.getSelectedQueryName("query_list", "selected");
    queryTypeId = e.target.options[e.target.selectedIndex].id;
    queryValue =  e.target.options[e.target.selectedIndex].value;
    problemTypeId = query.view.getProblemTypeId("problem_types");
    optional = {
        "question": queryValue, 
        "query_type": queryTypeId, 
        "problem_type": problemTypeId,
        "status": "open"
    };
    console.log(optional);
    query.func.updateQuery(queryId, optional);
    query.view.loadQuestion(queryValue, "query_author", "open");
});

document.getElementById('question').addEventListener("change", function(e){
    var queryValue = "", queryId = "";
    queryId = query.view.getSelectedQueryListName();
    queryValue = e.target.value.trim();
    query.func.updateQuery(queryId, {"status": "open"});
});

}
catch (e) {
    alert(e.message);
} 