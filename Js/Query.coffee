class Query
    constructor: (config, queries) ->
        @queries = queries;
        for own key, v of config
            @[key] = v
    addQuery: (q, opt = "") ->
        @throwIsEmpty(q, @alert.question.empty)
        q = q is @defaultQuestion ? "" : q;
        newQuery = "question" : q, "reply" : "", "status" : "initial"
        lebel = @label + @queries.total;
        if opt != ""
            for own key, list of opt
                newlist[key] = opt[key]
        @queries[label] = newQuery
    updateQuery: (Id, q) ->
        @throwIsEmpty(Id, @alert.empty)
        if typeof @queries[Id] is "undefined"
            throw new ("Invalid Query ID")
        Qstatus = @queries[Id].status;
        if @isChangesAllowed(Qstatus) is false
            @customAlert("Sorry! Unable to edit", Id)
            return false
        Query = @queries[Id]
        for own key, Q of q
            if typeof @queries[key] != "undefined" 
                Query[key] = Q[key]
    deleteQuery: (Id) ->
        @throwIsEmpty(Id, @alert.empty)
        Status = @queries[Id].status
        if @isChangesAllowed(Status) is false
            @customAlert("Sorry! Unable to edit", Id)
        @queries[Id].status = "deleted"
        count = @queries.deleted + 1
        @queries.deleted = count
    isUnsavedQueryAvailable: () ->
        for own key, Status of @queries
            if @queries[key].status is "initial"
                @customAlert("Sorry! Already unsaved Query is found", key)
                return true
        return false
    throwIsEmpty: (v, msg) ->
        v = v.trim()
        if v is ""
            alert(msg)
            throw (msg)
        return true
    getQuestion: (Id) ->
        @throwIsEmpty(Id, @alert.empty)
        if typeof @queries[Id] != "undefined"
            question = @queries[Id].question
    getReply: (Id)->
        @throwIsEmpty(Id, @alert.empty)
        if typeof @queries[Id] != "undefined"
            question = @queries[Id].reply
    getStatus: (Id) ->
        @throwIsEmpty(Id, @alert.empty)
        if typeof @queries[Id] != "undefined"
            question = @queries[Id].status
    getTotal: () ->
        if typeof @queries.total is "undefined"
            0
        else
            @queries.total
    getDeletedTotal: () ->
        if typeof @queries.deleted is "undefined"
            0
        else
            @queries.deleted
    getAnsweredTotal: () ->
        if typeof @queries.answered is "undefined"
            0
        else
            @queries.answered
    getAttachTotal: (Id) ->
        if typeof @queries[Id] is "undefined"
            return 0
        
        if typeof @queries[Id].attach is "undefined"
            0
        else
            return @queries[Id].attach
    customAlert: (msg, v) ->
        @alert(msg + " for " v)
    sendToServer: () ->
        ""
    