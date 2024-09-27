const canvas = document.getElementById('frame');
const contest = canvas.getContext('2d');
gsap.registerPlugin(ScrollTrigger);
const flame = {
    currentIndex: 0,
    maxIndex: 382
}

let imagesLoaded = 0;
const images = [];

function preloadImages() {
    for (let i = 1; i <= flame.maxIndex; i++) {
        const imgUrl = `./img/frame_${i.toString().padStart(4, '0')}.jpeg`;
        const img = new Image();
        img.src = imgUrl;
        img.onload = () => {
            imagesLoaded++
            if (imagesLoaded === flame.maxIndex) {
                loadImages(flame.currentIndex);
                nextFrame();
            }
        }
        images.push(img);
    }
}

function loadImages(index) {
    if(index >= 0 && index < flame.maxIndex) {
        const img = images[index];

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);

        const width = img.width * scale;
        const height = img.height * scale;

        const x = (canvas.width - width) / 2;
        const y = (canvas.height - height) / 2;

        contest.clearRect(0, 0, canvas.width, canvas.height);
        contest.imageSmoothingEnabled = true
        contest.imageSmoothingQuality = 'high';
        contest.drawImage(img, x, y, width, height);

        flame.currentIndex = index;
    }
}

function nextFrame() {
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.parent',
            start: 'top top',
            // end: 'bottom top',
            scrub: 2,
            // markers: true
        }
    });

    tl.to(flame, {
        currentIndex: flame.maxIndex,
        onUpdate: () => loadImages(Math.floor(flame.currentIndex))
    })
}

preloadImages()