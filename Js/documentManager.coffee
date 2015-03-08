class documentManager extends eventDispatcher
    constructor: () ->
        @dom = document
    getElement: (selector, parentElem = null) ->
        throw new "Selector is empty!" if typeof selector is "undefined"
        if parentElem is null
            elm = @dom.querySelector(selector)
        else
            elm = parentElem.querySelector(selector)
        elm = if elm is null then null else elm
        
    getElements: (selectors, parentElem = null) ->
        throw new "Selector is empty!" if typeof selectors is "undefined"
        if parentElem is null
            elms = @dom.querySelectorAll(selectors)
        else
            elms = parentElem.querySelectorAll(selectors)
        elms = if elms.length is 0 then null else elms
    getHeight: (elm) ->
        throw new "NULL Object!" if elm == null or typeof elm is "undefined"
        elm.clientHeight
    addStyleProperty: (elm, attr, val, prefix) ->
        throw new "NULL Object!" if typeof elm is null or typeof elm is "undefined"
        elm.style[attr] = val + prefix
    addClass: (elm, klass) ->
        throw new "NULL Object!" if typeof elm == null
        klasses = elm.className
        pattern = /\s+/
        klasses = klasses.split(pattern)
        klasses.push(klass)
        appendClass += " " + k for k in klasses
        elm.setAttribute("class", appendClass)
    removeClass: (elm, klass) ->
        throw new "NULL Object!" if typeof elm == null
        klasses = elm.className
        pattern = /\s+/
        klasses = klasses.split(pattern)
        for k in klasses
            if klasses[k] == klass
                continue
            newClass += " " + klasses[k]
        elm.setAttribute("class", newClass)
    addElement: (node, childeNode, opt = []) ->
        if node is null or typeof node is "undefined"
            throw new ("Parent node is empty")
        if childeNode is null or typeof childeNode is "undefined"
            throw new ("Child node is empty")
        newNode = dom.createEelement(childeNode)
        for own key, n of opt
            @setAttribute(newNode, key, n[key])
        node.appendChild(newNode)
    setAttribute: (n, key, v) ->
        if n is null
            throw new ("Node is empty")
        n.setAttribute(key, v)
    
