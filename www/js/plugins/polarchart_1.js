
      var canvas  = document.getElementById('myCanvas');
      var context = canvas.getContext('2d');
      var centerX = canvas.width / 2;
      var centerY = canvas.height / 2;
      var radius  =(canvas.width / 2)*0.8;
      var radius_small = radius*0.1;//outside small circle
      var radius_inner = radius*0.35;//first inner circle
      var radius_max_graph=radius-radius_inner;
      context.clearRect(0, 0, centerX, centerY);
      
          var x1=centerX + radius* (Math.cos(Math.PI/10));
          var y1=centerX + radius* (Math.sin(Math.PI/10));
          var count1='10';//It shoud come from data base
          drawCircle(x1,y1,count1);         
        
          var x2 = centerX + radius * (Math.cos(Math.PI / 5 + Math.PI / 10));
          var y2 = centerX + radius * (Math.sin(Math.PI / 5 + Math.PI / 10));
          var count2 = '14';
          drawCircle(x2, y2, count2); 

          var x3 = centerX + radius * (Math.cos(2 * Math.PI / 5 + Math.PI / 10));
          var y3 = centerX + radius * (Math.sin(2 * Math.PI / 5 + Math.PI / 10));
          var count3 = '10';
          drawCircle(x3, y3, count3);

          var x4 = centerX + radius * (Math.cos(3 * Math.PI / 5 + Math.PI / 10));
          var y4 = centerX + radius * (Math.sin(3 * Math.PI / 5 + Math.PI / 10));
          var count4 = '15';
          drawCircle(x4, y4, count4);

          var x5 = centerX + radius * (Math.cos(4 * Math.PI / 5 + Math.PI / 10));
          var y5 = centerX + radius * (Math.sin(4 * Math.PI / 5 + Math.PI / 10));
          var count5 = '17';
          drawCircle(x5, y5, count5);
          
      function drawCircle(x,y,content){
      context.globalCompositeOperation="source-over";
      context.beginPath();
      context.arc(x, y, radius_small, 0,  2*Math.PI, false);
      context.fillStyle = "#0e1b1d";
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle = "#49999c";
      context.stroke();
      
      //Text inside circle
      context.fillStyle = "#49999c"; // font color to write the text with
      var font = "bold " + 10 +"px source_sans_prolight";
      context.font = font;
      var width = context.measureText(content).width;
      var height = context.measureText("w").width;
      context.fillText(content, x - (width / 2), y + height / 2);    
      
      
           }
    //canvas.addEventListener('mousemove', track_mouse, false);
    canvas.addEventListener('click', click_mouse, false); 
     var   TextAlignment = {
            Left : 0,
            Center : 1,
            Right : 2,
            Justify : 3
        };
 
        function Point (x, y) {
            this.x = x;
            this.y = y;
        }
 
        function Band (center, minRadius, maxRadius,bandNo) {
            this.bandNo=bandNo;
            this.center = center;
            this.minRadius = minRadius;
            this.maxRadius = maxRadius;
        }
 
        function arc (band, startAngle, endAngle, text,arcNo,alignment) {
            this.position={bandNo:band.bandNo,arcPos:arcNo};
            this.band = band;
            this.startAngle = startAngle;
            this.endAngle = endAngle;
            this.text = text;
            this.alignment = (alignment !== undefined) ? alignment : TextAlignment.Center;
            if (arc.arcs === undefined) {
                arc.arcs = new Array();
            }
            arc.arcs.push(this);
           
        }
        
        arc.prototype.drawArcAfter = function (angle, text) {
                return new arc(this.band, this.endAngle, this.endAngle + angle, text);
            };
        arc.prototype.drawArcAfterUpTo = function (upToArc, text) {
                return new arc(this.band, this.endAngle, upToArc.startAngle, text);
            };
 
        arc.prototype.isInside = function (pos) {
          
                // http://stackoverflow.com/questions/6270785/how-to-determine-whether-a-point-x-y-is-contained-within-an-arc-section-of-a-c
                // Angle = arctan(y/x); Radius = sqrt(x * x + y * y);
                var result = false;
                var radius = Trig.distanceBetween2Points(pos, this.band.center);
                // we calculate atan only if the radius is OK
                if ((radius >= this.band.minRadius) && (radius <= this.band.maxRadius)) {
                     
                    var angle = Trig.angleBetween2Points(this.band.center, pos);
                  
                    var a = (angle < 0) ? angle + 2 * Math.PI : angle;
                    var sa = this.startAngle;
                    var ea = this.endAngle;
                 
                   
                    if (ea > 2 * Math.PI) {
                           
                        sa -= 2 * Math.PI;
                        ea -= 2 * Math.PI;
                    }
 
               if (sa > ea) {
                  
                        sa -= 2 * Math.PI;
                      
                    }
                   
                    if ((a >= sa) && (a <= ea)) {
                        
                        result = true;
                      
                       
                    }
                }
                
                return result;
            };
        
        arc.prototype.higlightIfInside = function (pos) {
                if (this.isInside(pos)) {
                    arc.isHighlighted = this;
                    drawArc(this, true);
                }
            };
        
        arc.prototype.doTask = function (pos) {
              if (this.isInside(pos)) {
                  drawArc(this,true);  
                 // alert('You have clicked '+this.text );
                }
            };
        
        arc.lastHighlighted = null;
        arc.isHighlighted = null;
 
        arc.drawAll = function () {
            arc.arcs.forEach(function (a) {
                if(a.position.bandNo == 3 && a.position.arcPos == 3){
                     drawArc(a,true);
                }else{
                     drawArc(a);
                }
               
            });
        }
        
        arc.checkMousePos = function (pos) {
            arc.lastHighlighted = arc.isHighlighted;
            arc.isHighlighted = null;
            arc.arcs.forEach(function (a) {
              a.higlightIfInside(pos);
            });
            if ((arc.lastHighlighted !== null) && (arc.isHighlighted != arc.lastHighlighted)) {
               
                drawArc(arc.lastHighlighted);
            }
               
            // set cursor according to the highlight status
             canvas.style.cursor = (arc.isHighlighted !== null) ? 'pointer' : 'default';
            
        }
 
        arc.doTasks = function (pos) {
            arc.arcs.forEach(function (a) {
                a.doTask(pos);
            });
        }
 
        
        var Trig = {
            distanceBetween2Points: function (point1, point2) {
                var dx = point2.x - point1.x;
                var dy = point2.y - point1.y;
                return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            },
            angleBetween2Points: function (point1, point2) {
                var dx = point2.x - point1.x;
                var dy = point2.y - point1.y;
                return Math.atan2(dy, dx);
            },
            angleDiff: function (startAngle, endAngle) {
                var angleDiff = (startAngle - endAngle);
                angleDiff += (angleDiff > Math.PI) ? -2 * Math.PI : (angleDiff < -Math.PI) ? 2 * Math.PI : 0
                return angleDiff;
            }
        }
     
        var center = new Point(canvas.width / 2, canvas.height / 2);
        var r1 = new Band(center, 1, radius_inner,1);
        var r3 = new Band(center, radius_inner, radius,3);
    
        var r2_1 = new Band(center, radius_inner,  (radius_inner +radius_max_graph*0.8), 2);
        var r2_2 = new Band(center, radius_inner, (radius_inner +radius_max_graph), 2);
        var r2_3 = new Band(center, radius_inner, (radius_inner +radius_max_graph*0.5), 2);
        var r2_4 = new Band(center, radius_inner, (radius_inner +radius_max_graph*0.6), 2);
        var r2_5 = new Band(center, radius_inner, (radius_inner +radius_max_graph*0.7), 2);
        
        var arc2_1 = new arc(r2_1, 0 * Math.PI, 0.2 * Math.PI, "Won",1);
        var arc2_2 = new arc(r2_2, 0.2 * Math.PI, 0.4 * Math.PI, "Coached",2);
        var arc2_3 = new arc(r2_3, 0.4 * Math.PI, 0.6 * Math.PI, "Played",3);
        var arc2_4 = new arc(r2_4, 0.6 * Math.PI, 0.8 * Math.PI, "Init",4);
        var arc2_5 = new arc(r2_5, 0.8 * Math.PI, 1 * Math.PI, "Upnext",5);
        
        var arc3_1 = new arc(r3, 0 * Math.PI, 0.2 * Math.PI, "",1);
        var arc3_2 = new arc(r3, 0.2 * Math.PI, 0.4 * Math.PI, "",2);
        var arc3_3 = new arc(r3, 0.4 * Math.PI, 0.6 * Math.PI, "",3);
        var arc3_4 = new arc(r3, 0.6 * Math.PI, 0.8 * Math.PI, "",4);
        var arc3_5 = new arc(r3, 0.8 * Math.PI, 1 * Math.PI, "",5);
        var context = canvas.getContext('2d');
        
        arc.drawAll();
        
 
        function drawArc(arc, isHighlighted) {
            var gapsAtEdgeAngle = Math.PI / 460;
            var isCounterClockwise = false; 
            var startAngle = arc.startAngle + gapsAtEdgeAngle;
            var endAngle = arc.endAngle - gapsAtEdgeAngle;
            context.beginPath();            
            var radAvg = (arc.band.maxRadius + arc.band.minRadius) / 2;
            var radText=(radius + arc.band.minRadius) / 2;
            //if( arc.band.bandNo == 1){radAvg = arc.band.maxRadius*0.75;}
            context.arc(arc.band.center.x, arc.band.center.y, radAvg, startAngle, endAngle, isCounterClockwise);
            context.lineWidth = arc.band.maxRadius - arc.band.minRadius;
             
            // line color
           if( arc.band.bandNo == 2){
               //context.globalCompositeOperation="destination-over";
               context.strokeStyle = isHighlighted ? '#1a2f30' : '#1e3637';
            
            context.stroke();}
           else if( arc.band.bandNo == 1){
            context.strokeStyle = isHighlighted ? '#111f22' : '#142427';
            context.stroke();} 
        else if( arc.band.bandNo == 3){
            context.strokeStyle = isHighlighted ? '#111f22' : '#142427';
            context.stroke();} 
        
            drawTextAlongArc(arc.text, center, radText, startAngle, endAngle, arc.alignment,arc.band.bandNo);             
            context.globalCompositeOperation="destination-over";
        }
 
        function drawTextAlongArc(text, center, radius, startAngle, endAngle, alignment,bandNo) {
            context.globalCompositeOperation="source-over";
            var fontSize = 7;
            var lineSpacing = 0;
			 
            var lines = text.split('\n');
            var lineCount = lines.length;
            radius = radius + (lineCount - 1) / 2 * (fontSize + lineSpacing)
            
            // if( bandNo == 1){radius=200;}
            lines.forEach(function (line) {
                drawLineAlongArc(context, line, center, radius, startAngle, endAngle, fontSize, alignment,bandNo);
                radius -= (fontSize + lineSpacing);
            });           
        }
 
        function drawLineAlongArc(context, str, center, radius, startAngle, endAngle, fontSize, alignment,bandNo) {
           
           var len = str.length, s;
            context.save();
            //context.font = 6 +"px sans-serif";
             context.font = fontSize + 'px source_sans_prolight';
            context.textAlign = 'center';
            context.fillStyle = 'white';
           
            // check if the arc is more at the top or at the bottom part of the band
            var upperPart = ((startAngle + endAngle) / 2) > Math.PI;
 
            // reverse the aligment direction if the arc is at the bottom
            // Center and Justify is neutral in this sence
            if (!upperPart) {
                if (alignment == TextAlignment.Left) {
                    alignment = TextAlignment.Right;
                }
                else if (alignment == TextAlignment.Right) {
                    alignment = TextAlignment.Left;
                }
            }
 
            //var metrics = context.measureText(str);
            var metrics = context.measureText(str.replace(/./gi, 'W'));
            var textAngle = metrics.width / (radius - fontSize / 2);
 
            var gapsAtEdgeAngle = Math.PI / 80;
 
            if (alignment == TextAlignment.Left) {
                startAngle += gapsAtEdgeAngle;
                endAngle = startAngle + textAngle;
            }
            else if (alignment == TextAlignment.Center) {
                var ad = (Trig.angleDiff(endAngle, startAngle) - textAngle) / 2;
                startAngle += ad;
                endAngle -= ad;
            }
            else if (alignment == TextAlignment.Right) {
                endAngle -= gapsAtEdgeAngle;
                startAngle = endAngle - textAngle;
            }
            else if (alignment == TextAlignment.Justify) {
                startAngle += gapsAtEdgeAngle;
                endAngle -= gapsAtEdgeAngle;
            }
            else {
                // alignmet not supported
                // show some kind of warning
                // or fallback to default?
            }
 
            // calculate text height and adjust radius according to font size
            if (upperPart) {
                // if it is in the upper part, we have to change the orientation as well -> multiply by -1
                radius = -1 * (radius - fontSize / 2);
            }
            else {
                radius += fontSize / 2; //*
            }
 
            context.translate(center.x, center.y); 
            var angleStep =(Trig.angleDiff(endAngle, startAngle) / len);
            var angleStep1 =angleStep*0.60;
            
            if (upperPart) {
                angleStep *= -1;
                context.rotate(startAngle + Math.PI / 2);
            }
            else {
                context.rotate(endAngle - Math.PI / 2);
            }
           
            context.rotate(angleStep1 / 2);            
            for (var n = 0; n < len; n++) {
                if(n==0){context.rotate(-angleStep*1.5);}else{context.rotate(-angleStep1);}
                context.save();
                context.translate(0, radius);                
                s = str[n];
                context.fillText(s, 0, 0);
                context.restore();
                
            }
            context.restore();
        }
 
 
        function track_mouse(e) {
            var target = e.currentTarget;
            var mousePos = getMousePos(target, e);
            arc.checkMousePos(mousePos);
        }
 
        function click_mouse(e) {
            var target = e.currentTarget;
            console.log('Target');
            console.log(e);
            var mousePos = getMousePos(target, e);
 
            arc.doTasks(mousePos);
        }
 
        function getMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }
      
    
      
 