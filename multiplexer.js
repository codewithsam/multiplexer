var $multiplexer = (function () {

    var mxform, mxstep, forms, steplist;
    var current_step, last_step;

    var stepBuilder = function (stepclass, totalforms) {
        mxstep = $('.' + stepclass);
        var list_size = 100 / totalforms;
        var elem = '<ul class="multiplex-counter cf">';
        for (var i = 0; i < totalforms; i++) {
            elem += '<li style="width: ' + list_size + '%;"></li>';
        }
        elem += '</ul>';
        mxstep.append(elem);
        steplist = $('.multiplex-counter li');        
        current_step = 0;
        last_step = totalforms - 1;
        
    };

    var formBuilder = function(mxform){
        current_step = mxform.data('step')-1;
        forms.addClass('hide');
        forms.eq(0).addClass('active').removeClass('hide');
    };

    var form = function (formclass, stepclass, elems) {
        mxform = $('.' + formclass);
        var mxform_children;
        if(elems){
            mxform_children = mxform.children().filter(function(){
            var type = $(this).get(0).tagName.toLowerCase();
            var flag = false;
            for(var i=0;i<elems.length;i++){
                var val = elems[i].trim();
                val = val.toLowerCase();
                if(val === type){
                    flag = true;
                    break;
                }
            }
            if(flag){
                flag = false;
                return true;
            }else{
                flag = false;
                return false;
            }
        });
        }else{
            mxform_children = mxform.children();
        }
        forms = mxform_children;
        var totalforms = mxform_children.length;
        stepBuilder(stepclass, totalforms);
        formBuilder(mxform);
        changeForward();
    };

    var changeForward = function () {
        for(var i=0;i<current_step+1;i++){
            steplist.eq(i).addClass('visited');
        }
        steplist.removeClass('active');
        steplist.eq(current_step).addClass('active');
        forms.addClass('hide');
        forms.eq(current_step).removeClass('hide');
    };

    var changeBackward = function(){
        steplist.removeClass('active');
        steplist.eq(current_step).addClass('active');
        forms.addClass('hide');
        forms.eq(current_step).removeClass('hide');
    };
    

    var next = function () {
        if (current_step >= last_step) {
            console.log('No more steps to follow');
            return;
        }
        current_step++;
        changeForward();
    }
    var previous = function () {
        if (current_step <= 0) {
            console.log('No more steps to preview');
            return;
        }
        current_step--;
        changeBackward();
    }


    var API = {
        form: form,
        next: next,
        previous: previous
    };

    return API;

}());