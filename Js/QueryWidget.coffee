class QueryWidget extends documentManager
    costructor: (queryObj, editorObj, config) ->
        @handlers = []
        @activeQuery = ""
        @query = queryObj
        @eObj = editorObj
        for own key, v of config
            @[key] = config[key]
    init: () ->
        @initDialogue()
        @initEditor()
        @initLabel()
        @initQuestion()
        @initCounter()
        @initProceed()
        @initClose()
        @initCancel()
        @initDelete(@deleteType)
        @initAttach(@attachType)
        @initProblemType(@problemType)
        @initQueryType(@queryType)
    initDialogue: () ->
        @dialogue = @getElement(@dialogueSelector)
        if @dialogue is null
            throw new ("Unable to initialize dialogue")
    initEditor: (isItOptional = false) ->
        txtArea = @getElement(@txtAreaSelector, @dialogue)
        if txtArea is null and isItOptional is false
            throw new ("Unable to initialize textArea")
        @editor = @eObj.replace(@txtAreaSelector, toolbar: [@toolbar])
    initLabel: (isItOptional = false) ->
        @label = @getElement(@labelSelector, @dialogue)
        if @label is null and isItOptional is false
            throw new ("Unable to initialize label")
    initQuestion: (isItoptional = false) ->
        @questionNode = @getElement(@questionSelector, @dialogue)
        if @questionNode is null and isItOptional is false
            throw new ("Unable to initialize questionNode")
    initCounter: (isItOptional = false) ->
        @counterNode = @getElement(@countSelector, @dialogue)
        if @counterNode is null and isItOptional is false
            throw new ("Unable to initialize counterNode")
    initProceed: (isItOptional = false) ->
        @proceedNode = @getElement(@proceedSelector, @dialogue)
        if @proceedNode is null and isItOptional is false
            throw new ("Unable to initialize proceedNode")
    initClose: (isItOptional = false) ->
        @closeNode = @getElement(@closeSelector, @dialogue)
        if @closeNode is null and isItOptional is false
            throw new ("Unable to initialize closeNode")
    initCancel: (isItOptional = false) ->
        @cancelNode = @getElement(@cancelSelector, @dialogue)
        if @cancelNode is null and isItOptional is false
            throw new ("Unable to initialize cancelNode")
    initDelete: (isItOptional = false) ->
        @deleteNode = @getElement(@deleteSelector, @dialogue)
        if @deleteNode is null and isItOptional is false
            throw new ("Unable to initialize deleteNode")        
    initProblemType: (isItoptional = false) ->
        @problemTypeNode = @getElement(@problemTypeSelector, @dialogue)
        if @problemTypeNode is null and isItOptional is false
            throw new ("Unable to initialize problemTypeNode")
    initQueryType: (isItoptional = false) ->
        @queryTypeNode = @getElement(@queryTypeSelector, @dialogue)
        if @queryTypeNode is null and isItOptional is false
            throw new ("Unable to initialize queryTypeNode")
    loadLabel: () ->
        for own key, v of @query.queires
            attributes = "id" : key, "innerText" : v[key]
            @addElement(@label, "li", attributes)
    setActiveLabel: (Id) ->
        @throwEmptyAlert(Id, @message.empty)
        @removeClass(@label, @klass.selected)        
        @addClass(leb, @klass.selected)
    loadQuestion: (Id) ->
        @throwEmptyAlert(Id, @message.empty)        
        question = @query.getQuestion(Id)
        @setNodeValue(@questionNode, "value", question)
    loadReply: (Id) ->
        @throwEmptyAlert(Id, @message.empty)        
        reply = @query.getReply(Id)
        @setData(reply)        
    loadProblemType: () ->
        for own key, problemNo of problemTypeList
            problemType = problemNo["problem_type"]
            problemId = problemNo["id"]
            @addDropDownElement(@problemTypeNode, problemType, "id" : problemId)
    loadQueryType: (queryList = ["Please choose query type"]) ->
        len = queryList.length
        if len > 1
            for i..len
                @addDropDownElement(@queryTypeNode, queryList[i], "id": i+1)
        else
            @addDropDownElement(@queryTypeNode, queryList[0], "id" : 1)
    loadCount: (Id = "") ->
        total = @query.getTotal()
        answered = @query.getAnsweredTotal()
        deleted = @query.getDeletedTotal()
        attach = @query.getAttachTotal(Id)
        total = total - deleted
        totalCounter = @getElement(@totalCounterSelector, @counterNode)
        answerCounter = @getElement(@answeredCounterSelector, @counterNode)
        attachCounter = @getElement(@attachCounterSelector, @counterNode)
        @setText(@totalCounter, total)
        @setText(@answerCounter, answered)
        @setText(@attachCounter, attach)
    setData: (v) ->
        @editor.setData(v)
    getData: () ->
        @editor.getData()
    setProceedMode: (status = false) ->
        @setAttribute(@proceedNode, "disabled", status)
    setQuestionMode : (status = false) ->
        @setAttribute(@questionNode, "disabled", status)
    setReplyMode: (status = false) ->
        @editor.setReadOnly(status)
    show: () ->
        @removeClass(@dialogue, @klassHide)
        @addClass(@dialogue, @klassShow)
    hide: () ->
        @removeClass(@dialogue, @klassShow)
        @addClass(@dialogue, @klassHide)
    onProceed: () ->
        response = @getData()
        question = @getText(@questionNode)
        key = @activeQuery
        problemType = @getProblemType
        queryType = @getQueryType
        if @query.queries.mode is "raise"
            data = "question" : question, "problem_type" : problemType,
            "query_type": queryType
        else
            data = "reply" : response
        @query.updateQuery(key, data)
        @hide()
    onCancel: () ->
        @hide()
    onClose: () ->
        @hide()
    onDelete: () ->
        question = @deleteText
        key = @activeQuery
        if @query.queries.mode is "raise"
            data = "question" : question, "status" : "deleted"
            @query.updateQuery(key, data)
    onAttach: () ->