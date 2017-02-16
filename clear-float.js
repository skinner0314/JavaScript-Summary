1，父级div定义 height 
<style type="text/css"> 
.div1{background:#000080;border:1px solid red;/*解决代码*/height:200px;} 
.div2{background:#800080;border:1px solid red;height:100px;margin-top:10px} 
.left{float:left;width:20%;height:200px;background:#DDD} 
.right{float:right;width:30%;height:80px;background:#DDD} 
</style> 
<div class="div1"> 
<div class="left">Left</div> 
<div class="right">Right</div> 
</div> 
<div class="div2"> 
div2 
</div> 


2，结尾处加空div标签 clear:both 
<style type="text/css"> 
.div1{background:#000080;border:1px solid red} 
.div2{background:#800080;border:1px solid red;height:100px;margin-top:10px} 
.left{float:left;width:20%;height:200px;background:#DDD} 
.right{float:right;width:30%;height:80px;background:#DDD} 
/*清除浮动代码*/ 
.clearfloat{clear:both} 
</style> 
<div class="div1"> 
<div class="left">Left</div> 
<div class="right">Right</div> 
<div class="clearfloat"></div> 
</div> 
<div class="div2"> 
div2 
</div> 


3，父级div定义 伪类:after 和 zoom 
<style type="text/css"> 
.div1{background:#000080;border:1px solid red;} 
.div2{background:#800080;border:1px solid red;height:100px;margin-top:10px} 
.left{float:left;width:20%;height:200px;background:#DDD} 
.right{float:right;width:30%;height:80px;background:#DDD} 
/*清除浮动代码*/ 
.clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0} 
.clearfloat{zoom:1} 
</style> 
<div class="div1 clearfloat"> 
<div class="left">Left</div> 
<div class="right">Right</div> 
</div> 
<div class="div2"> 
div2 
</div> 


4，父级div定义 overflow:hidden 
<style type="text/css"> 
.div1{background:#000080;border:1px solid red;/*解决代码*/width:98%;overflow:hidden} 
.div2{background:#800080;border:1px solid red;height:100px;margin-top:10px;width:98%} 
.left{float:left;width:20%;height:200px;background:#DDD} 
.right{float:right;width:30%;height:80px;background:#DDD} 
</style> 
<div class="div1"> 
<div class="left">Left</div> 
<div class="right">Right</div> 
</div> 
<div class="div2"> 
div2 
</div> 


5，父级div定义 overflow:auto 
<style type="text/css"> 
.div1{background:#000080;border:1px solid red;/*解决代码*/width:98%;overflow:auto} 
.div2{background:#800080;border:1px solid red;height:100px;margin-top:10px;width:98%} 
.left{float:left;width:20%;height:200px;background:#DDD} 
.right{float:right;width:30%;height:80px;background:#DDD} 
</style> 
<div class="div1"> 
<div class="left">Left</div> 
<div class="right">Right</div> 
</div> 
<div class="div2"> 
div2 
</div> 



6，父级div 也一起浮动 
<style type="text/css"> 
.div1{background:#000080;border:1px solid red;/*解决代码*/width:98%;margin-bottom:10px;float:left} 
.div2{background:#800080;border:1px solid red;height:100px;width:98%;/*解决代码*/clear:both} 
.left{float:left;width:20%;height:200px;background:#DDD} 
.right{float:right;width:30%;height:80px;background:#DDD} 
</style> 
<div class="div1"> 
<div class="left">Left</div> 
<div class="right">Right</div> 
</div> 
<div class="div2"> 
div2 
</div> 



7，父级div定义 display:table 
<style type="text/css"> 
.div1{background:#000080;border:1px solid red;/*解决代码*/width:98%;display:table;margin-bottom:10px;} 
.div2{background:#800080;border:1px solid red;height:100px;width:98%;} 
.left{float:left;width:20%;height:200px;background:#DDD} 
.right{float:right;width:30%;height:80px;background:#DDD} 
</style> 
<div class="div1"> 
<div class="left">Left</div> 
<div class="right">Right</div> 
</div> 
<div class="div2"> 
div2 
</div> 



8，结尾处加 br标签 clear:both 
<style type="text/css"> 
.div1{background:#000080;border:1px solid red;margin-bottom:10px;zoom:1} 
.div2{background:#800080;border:1px solid red;height:100px} 
.left{float:left;width:20%;height:200px;background:#DDD} 
.right{float:right;width:30%;height:80px;background:#DDD} 
.clearfloat{clear:both} 
</style> 
<div class="div1"> 
<div class="left">Left</div> 
<div class="right">Right</div> 
<br class="clearfloat" /> 
</div> 
<div class="div2"> 
div2 
</div> 