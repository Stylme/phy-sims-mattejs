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
    Vertices = Matter.Vertices,
    Axes = Matter.Axes;


// create engine
var engine = Engine.create(),
    world = engine.world;

// create renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: true,
        background: 'transparent'
    }
});

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

var group = Body.nextGroup(true),
    length = 200,
    width = 25;

var fixPoint = { x: 400, y: 100 };

var regla = Bodies.rectangle(fixPoint.x, fixPoint.y, length, width, {
    frictionAir: 0,
    render: {
        fillStyle: 'transparent',
        lineWidth: 1
    }
});

World.add(world, regla);

var constr = Constraint.create({
    pointA: { x: regla.position.x - length * 0.42, y: regla.position.y },
    bodyB: regla
});

World.add(world, constr);



// add mouse control
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

// fit the render viewport to the scene
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 700, y: 600 }
});

Render.run(render);

$('#actualizar').on('click', function() {

    Body.setCentre(regla, fixPoint, false);

});