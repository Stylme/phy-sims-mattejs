var Engine = Matter.Engine,
    Events = Matter.Events,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Vector = Matter.Vector,
    Chart = Chart.Chart;

// create engine
var engine = Engine.create(),
    world = engine.world;

// create renderer
var render = Render.create({
    element: document.getElementById('phy'),
    engine: engine,
    options: {
        wireframes: true,
        showAngle: true
    }
});

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

/**
var group = Body.nextGroup(true),
    length = 200,
    width = 25;
*/

var longPend = 400;

var masa = Bodies.circle(
    400, longPend, 20, // x, y, r,
    {
        mass: 400,
        stiffness: 0,
        inertia: Infinity,
        friction: 0,
        frictionAir: 0
    }
);

/**

var pendulum = Composites.stack(350, 160, 2, 1, -20, 0, function(x, y) {
    return Bodies.rectangle(x, y, length, width, {
        collisionFilter: { group: group },
        frictionAir: 0,
        chamfer: 5,
        render: {
            fillStyle: 'transparent',
            lineWidth: 1
        }
    });
});

Composite.add(pendulum, Constraint.create({
    bodyB: pendulum.bodies[0],
    pointB: { x: -length * 0.45, y: 0 },
    pointA: { x: pendulum.bodies[0].position.x - length * 0.42, y: pendulum.bodies[0].position.y },
    stiffness: 0.9,
    length: 0,
    render: {
        strokeStyle: '#4a485b'
    }
}));
*/

var techo = Bodies.rectangle(
    400, 0, 100, 25, {
        isStatic: true,
    }
);

World.add(world, masa);

World.add(world, techo)

var constr = Constraint.create({
    length: longPend,
    bodyA: techo,
    bodyB: masa,
    stiffness: 1
});

World.add(world, constr);






var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

World.add(engine.world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;



Render.run(render);

console.log(masa);

console.log(longPend);

$('#actualizar').on('click', function() {
    /*
    var angRad = ($('#angulo').val() * Math.PI) / 180;
    var co = 400 * Math.sin(angRad);
    var ca = 400 * Math.cos(angRad);
    */

    //masa.constraintImpulse = {x:co, }
    var l = longPend;
    l = document.getElementById('longitud').val();
    console.log(l);
});

console.log(constr);

var myVar = setInterval(myTimer, 1);

function myTimer() {
    var d = Math.atan(masa.position.y / masa.position.x);
    document.getElementById("demo").innerHTML = (d * 180) / Math.PI;
}

var ctx = document.getElementById('cnv');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Posición respecto al tiempo',
            data: [1, 9, -3, 0, 2, -1],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});