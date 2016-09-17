    var scene, camera, renderer;
    var geometry, material, mesh, controls;

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    init();
    animate();

    function init() {
        
    //RENDERER
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setClearColor( 0xFF6A00 );
        render.antialias = true;
        renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        
    //SCENE
        scene = new THREE.Scene();
        var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
        
    //CAMERA
        camera = new THREE.PerspectiveCamera( 15, WIDTH / HEIGHT,1, 1500 );
        camera.position.set( 35, 20, 100 );
        
    //LIGHTS
        var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
        directionalLight.position.set( 0, 1, 0 );
        scene.add( directionalLight );
        
        var directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
        directionalLight2.position.set( -1, -1, 1 );
        scene.add( directionalLight2 );
        
        var directionalLight3 = new THREE.DirectionalLight( 0xffffff, 0.5 );
        directionalLight3.position.set( 1, -1, -1 );
        scene.add( directionalLight3 );

    //MATERIAL IMAGE LOADER
    var materials = [
       new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("../assets/sunflower.png") }),
       new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("../assets/sunflower.png") }),
       new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("../assets/sunflower.png") }),
       new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("../assets/sunflower.png") }),
       new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("../assets/sunflower.png") }),
       new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("../assets/sunflower.png") })
    ];
        
    mesh = new THREE.Mesh(
    new THREE.BoxGeometry( 10, 10, 10 ),
    new THREE.MeshFaceMaterial( materials ) );
    scene.add( mesh );
        
     //CONTROLS
        controls = new THREE.OrbitControls (camera);
        controls.enableDamping = true;
        controls.dampingFactor = 0.025;
        controls.maxPolarAngle = Math.PI / 5 ;
        controls.minPolarAngle = 0;
        controls.maxAzimuthAngle = Infinity;
        controls.minAzimuthAngle = -Infinity;
           
    //RESIZE LISTENER
        window.addEventListener('resize', function() {
            var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;
            renderer.setSize(WIDTH, HEIGHT);
            camera.aspect = WIDTH / HEIGHT;
            camera.updateProjectionMatrix();
        }); 
        
        window.addEventListener( 'mousemove', onMouseMove, false );

        window.requestAnimationFrame(render);
        
      animate();
    }

    function animate() {
        
        requestAnimationFrame( animate );
        controls.update();
        render();
    }

    function render() {
        mesh.rotation.x = mouse.y;
        mesh.rotation.y = mouse.x;
        renderer.render( scene, camera );
    }

    function onMouseMove( event ) {

	   mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	   mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;		
    }