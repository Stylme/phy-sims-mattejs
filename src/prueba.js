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
    Vector = Matter.Vector;

// create engine
var engine = Engine.create(),
    world = engine.world;

// create renderer
var render = Render.create({
    element: document.getElementById('phy'),
    engine: engine,
    options: {
        wireframes: false,
        background: '#0f0f13'
    }
});

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

var group = Body.nextGroup(true),
    length = 200,
    width = 25;

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

pendulum.bodies[0].render.strokeStyle = '#4a485b';
pendulum.bodies[1].render.strokeStyle = '#4a485b';

world.gravity.scale = 0.001;

Composites.chain(pendulum, 0.45, 0, -0.45, 0, {
    stiffness: 0.9,
    length: 0,
    angularStiffness: 0.7,
    render: {
        strokeStyle: '#4a485b'
    }
});

var masa = Bodies.circle(
    0, 0, 4, {
        isStatic: true
    }
);

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


World.add(world, pendulum);

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

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 700, y: 600 }
});

Render.run(render);