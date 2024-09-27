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
    if (index >= 0 && index < flame.maxIndex) {
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

    function updateFrame(index) {
        return {
            currentIndex: index,
            // maxIndex: flame.maxIndex,
            onUpdate: () => loadImages(Math.floor(flame.currentIndex))
        }
    }

    tl
        .to(flame, updateFrame(50), 'frame1')
        .to(".textParent1", { opacity: 0, ease: "linear" }, 'frame1')

        .to(flame, updateFrame(80), 'frame2')
        .to(".textParent2", { opacity: 1, ease: "linear" }, 'frame2')

        .to(flame, updateFrame(110), 'frame3')
        .to(".textParent2", { opacity: 1, ease: "linear" }, 'frame3')

        .to(flame, updateFrame(140), 'frame4')
        .to(".textParent2", { opacity: 0, ease: "linear" }, 'frame4')

        .to(flame, updateFrame(170), 'frame5')
        .to(".textParent3", { opacity: 1, ease: "linear" }, 'frame5')

        .to(flame, updateFrame(200), 'frame6')
        .to(".textParent3", { opacity: 1, ease: "linear" }, 'frame6')

        .to(flame, updateFrame(230), 'frame7')
        .to(".textParent3", { opacity: 0, ease: "linear" }, 'frame7')

        .to(flame, updateFrame(382), 'frame8')
        .to(".textParent4", { opacity: 1, ease: "linear" }, 'frame8')
        .to(canvas, { scale: 0, ease: "linear" }, 'frame8')

}

window.addEventListener('resize', () => {
    loadImages(flame.currentIndex);
})

preloadImages()

// lenis
const lenis = new Lenis()

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)