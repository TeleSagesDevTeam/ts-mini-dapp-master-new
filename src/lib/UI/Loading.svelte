<script>
	export let text
</script>

<div class="app">
	<main>
	  <section>
		<span class="welcome">
		  <svg id="wrap" width="300" height="300">
			<path style="stroke: #173655; stroke-dasharray:820; stroke-dashoffset:820; stroke-width:18; fill:transparent" d="M150,150 m0,-130 a 130,130 0 0,1 0,260 a 130,130 0 0,1 0,-260"></path>
		  </svg>
		</span>
		<!-- </h1> -->
		<div class="breathing-circle">
			<div class="indicator_point">
				<span>
				{#if !text}
			  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="56px" viewBox="0 0 17 27" class="hourglass-icon" fill="white">
				<g class="hourglass-icon__device">
				  <rect x="0" y="0" width="17" height="2" />
				  <rect x="0" y="0" width="2" height="3" />
				  <rect x="0" y="2" width="2" height="1" />
				  <rect x="0" y="24" width="2" height="1" />
				  <rect x="0" y="24" width="2" height="3" />
				  <rect x="0" y="25" width="17" height="2" />
				  <rect x="1" y="2" width="1" height="3" />
				  <rect x="1" y="3" width="15" height="1" />
				  <rect x="1" y="4" width="2" height="4" />
				  <rect x="1" y="19" width="2" height="5" />
				  <rect x="1" y="23" width="15" height="1" />
				  <rect x="2" y="3" width="1" height="2" />
				  <rect x="2" y="7" width="1" height="2" />
				  <rect x="2" y="8" width="2" height="1" />
				  <rect x="3" y="8" width="1" height="2" />
				  <rect x="2" y="18" width="2" height="1" />
				  <rect x="2" y="18" width="1" height="2" />
				  <rect x="3" y="9" width="2" height="1" />
				  <rect x="3" y="17" width="2" height="1" />
				  <rect x="3" y="17" width="1" height="2" />
				  <rect x="4" y="9" width="1" height="2" />
				  <rect x="4" y="10" width="2" height="1" />
				  <rect x="4" y="16" width="1" height="2" />
				  <rect x="4" y="16" width="2" height="1" />
				  <rect x="5" y="10" width="1" height="2" />
				  <rect x="5" y="11" width="2" height="1" />
				  <rect x="5" y="15" width="1" height="2" />
				  <rect x="5" y="15" width="2" height="1" />
				  <rect x="6" y="11" width="1" height="2" />
				  <rect x="6" y="12" width="2" height="3" />
				  <rect x="6" y="14" width="1" height="2" />
				  <rect x="9" y="12" width="2" height="3" />
				  <rect x="10" y="11" width="2" height="1" />
				  <rect x="10" y="11" width="1" height="2" />
				  <rect x="10" y="15" width="2" height="1" />
				  <rect x="10" y="14" width="1" height="2" />
				  <rect x="11" y="10" width="2" height="1" />
				  <rect x="11" y="10" width="1" height="2" />
				  <rect x="11" y="15" width="1" height="2" />
				  <rect x="11" y="16" width="2" height="1" />
				  <rect x="12" y="9" width="2" height="1" />
				  <rect x="12" y="9" width="1" height="2" />
				  <rect x="12" y="16" width="1" height="2" />
				  <rect x="12" y="17" width="2" height="1" />
				  <rect x="13" y="8" width="2" height="1" />
				  <rect x="13" y="8" width="1" height="2" />
				  <rect x="13" y="17" width="1" height="2" />
				  <rect x="13" y="18" width="2" height="1" />
				  <rect x="14" y="3" width="2" height="2" />
				  <rect x="14" y="4" width="2" height="4" />
				  <rect x="14" y="7" width="1" height="2" />
				  <rect x="14" y="18" width="1" height="2" />
				  <rect x="14" y="19" width="2" height="4" />
				  <rect x="14" y="22" width="1" height="2" />
				  <rect x="15" y="0" width="2" height="3" />
				  <rect x="15" y="2" width="2" height="1" />
				  <rect x="15" y="2" width="1" height="2" />
				  <rect x="15" y="22" width="1" height="3" />
				  <rect x="15" y="24" width="2" height="1" />
				  <rect x="16" y="24" width="1" height="2" />
				</g>
				<g class="hourglass-icon__dots">
				  <rect class="hourglass-icon__dot" x="4" y="6" width="1" height="1"></rect>
				  <rect class="hourglass-icon__dot" x="6" y="6" width="1" height="1"></rect>
				  <rect class="hourglass-icon__dot" x="8" y="6" width="1" height="1"></rect>
				  <rect class="hourglass-icon__dot" x="10" y="6" width="1" height="1"></rect>
				  <rect class="hourglass-icon__dot" x="12" y="6" width="1" height="1"></rect>
				  <rect class="hourglass-icon__dot" x="5" y="7" width="1" height="1"></rect>
				  <rect class="hourglass-icon__dot" x="7" y="7" width="1" height="1"></rect>
				  <rect class="hourglass-icon__dot" x="9" y="7" width="1" height="1"></rect>
				  <rect class="hourglass-icon__dot" x="11" y="7" width="1" height="1"></rect>
				  <rect class="hourglass-icon__dot" x="6" y="8" width="1" height="1"></rect>
				  <rect class="hourglass-icon__dot" x="8" y="8" width="1" height="1"></rect>
				  <rect class="hourglass-icon__dot" x="10" y="8" width="1" height="1"></rect>
				  <rect class="hourglass-icon__dot" x="7" y="9" width="1" height="1"></rect>
				  <rect class="hourglass-icon__dot" x="9" y="9" width="1" height="1"></rect>
				  <rect class="hourglass-icon__dot" x="8" y="10" width="1" height="1"></rect>
				</g>
			  </svg>
			  {:else}
				<p class="text-center">{text}</p>
			  {/if}
			</span>
		  </div>
		</div>
	  </section>
	</main>
  </div>

  <style>
	.app {
	  display: flex;
	  flex-direction: column;
	  min-height: 100vh;
	  position: fixed;
	  top: 0;
	  left: 0;
	  right: 0;
	  bottom: 0;
	  z-index: -11;
	}
  
	main {
	  flex: 1;
	  display: flex;
	  flex-direction: column;
	  padding: 1rem;
	  width: 100%;
	  max-width: 64rem;
	  margin: 0 auto;
	  box-sizing: border-box;
	  justify-content: flex-end;
	}
  
	section {
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  flex: 0.6;
	}
  
	.indicator_point {
	  width: 100%;
	  height: 100%;
	  justify-content: center;
	  align-items: center;
	  display: flex;
	  /* position: absolute; */
	  top: 0;
	  bottom: 0;
	  right: 0;
	  left: 0;
	  z-index: 9999;
	}
  
	.breathing-circle {
	  width: 160px;
	  height: 160px;
	  border-radius: 50%;
	  background-color: rgba(28, 47, 84);
	  position: absolute;
	  z-index: 0;
	  animation: breathe 3s infinite alternate;
	}
  
	:root {
	  --animation-duration: 1800ms;
	}
  
	@keyframes hourglass-rotation {
	  0% {
		transform: rotate(0deg);
	  }
  
	  85% {
		transform: rotate(45deg);
	  }
  
	  90% {
		transform: rotate(90deg);
	  }
  
	  95% {
		transform: rotate(135deg);
	  }
  
	  100% {
		transform: rotate(180deg);
	  }
	}
  
	@keyframes dot-3 {
	  0% {
		transform: translate(0px, 0px);
	  }
  
	  4% {
		transform: translate(0, 16px);
	  }
  
	  60% {
		transform: translate(0, 14px);
	  }
  
	  64% {
		transform: translate(1px, 16px);
	  }
	}
  
	@keyframes dot-4 {
	  0% {
		transform: translate(0px, 0px);
	  }
  
	  8% {
		transform: translate(-2px, 18px);
	  }
  
	  60% {
		transform: translate(-3px, 16px);
	  }
	}
  
	@keyframes dot-2 {
	  0% {
		transform: translate(0px, 0px);
	  }
  
	  12% {
		transform: translate(2px, 16px);
	  }
	}
  
	@keyframes dot-8 {
	  0% {
		transform: translate(0px, 0px);
	  }
  
	  16% {
		transform: translate(1px, 18px);
	  }
	}
  
	@keyframes dot-7 {
	  0% {
		transform: translate(0px, 0px);
	  }
  
	  20% {
		transform: translate(-1px, 18px);
	  }
	}
  
	@keyframes dot-5 {
	  0% {
		transform: translate(0px, 0px);
	  }
  
	  24% {
		transform: translate(-3px, 18px);
	  }
	}
  
	@keyframes dot-1 {
	  0% {
		transform: translate(0px, 0px);
	  }
  
	  28% {
		transform: translate(3px, 18px);
	  }
	}
  
	@keyframes dot-9 {
	  0% {
		transform: translate(0px, 0px);
	  }
  
	  32% {
		transform: translate(-3px, 16px);
	  }
	}
  
	@keyframes dot-6 {
	  0% {
		transform: translate(0px, 0px);
	  }
  
	  36% {
		transform: translate(-1px, 18px);
	  }
	}
  
	@keyframes dot-12 {
	  0% {
		transform: translate(0px, 0px);
	  }
  
	  40% {
		transform: translate(2px, 14px);
	  }
	}
  
	@keyframes dot-10 {
	  0% {
		transform: translate(0px, 0px);
	  }
  
	  44% {
		transform: translate(-1px, 16px);
	  }
	}
  
	@keyframes dot-11 {
	  0% {
		transform: translate(0px, 0px);
	  }
  
	  48% {
		transform: translate(3px, 16px);
	  }
	}
  
	@keyframes dot-13 {
	  0% {
		transform: translate(0px, 0px);
	  }
  
	  52% {
		transform: translate(-1px, 14px);
	  }
	}
  
	@keyframes dot-14 {
	  0% {
		transform: translate(0px, 0px);
	  }
  
	  56% {
		transform: translate(1px, 14px);
	  }
	}
  
	@keyframes dot-15 {
	  0% {
		transform: translate(0px, 0px);
	  }
  
	  60% {
		transform: translate(0px, 5px);
	  }
  
	  64% {
		transform: translate(0px, 6px);
	  }
  
	  68% {
		transform: translate(0px, 8px);
	  }
	}
  
	.hourglass-icon {
	  animation: hourglass-rotation var(--animation-duration) step-end infinite;
	}
  
	.hourglass-icon__dot:nth-child(1) {
	  animation: dot-1 var(--animation-duration) step-end infinite;
	}
  
	.hourglass-icon__dot:nth-child(2) {
	  animation: dot-2 var(--animation-duration) step-end infinite;
	}
  
	.hourglass-icon__dot:nth-child(3) {
	  animation: dot-3 var(--animation-duration) step-end infinite;
	}
  
	.hourglass-icon__dot:nth-child(4) {
	  animation: dot-4 var(--animation-duration) step-end infinite;
	}
  
	.hourglass-icon__dot:nth-child(5) {
	  animation: dot-5 var(--animation-duration) step-end infinite;
	}
  
	.hourglass-icon__dot:nth-child(6) {
	  animation: dot-6 var(--animation-duration) step-end infinite;
	}
  
	.hourglass-icon__dot:nth-child(7) {
	  animation: dot-7 var(--animation-duration) step-end infinite;
	}
  
	.hourglass-icon__dot:nth-child(8) {
	  animation: dot-8 var(--animation-duration) step-end infinite;
	}
  
	.hourglass-icon__dot:nth-child(9) {
	  animation: dot-9 var(--animation-duration) step-end infinite;
	}
  
	.hourglass-icon__dot:nth-child(10) {
	  animation: dot-10 var(--animation-duration) step-end infinite;
	}
  
	.hourglass-icon__dot:nth-child(11) {
	  animation: dot-11 var(--animation-duration) step-end infinite;
	}
  
	.hourglass-icon__dot:nth-child(12) {
	  animation: dot-12 var(--animation-duration) step-end infinite;
	}
  
	.hourglass-icon__dot:nth-child(13) {
	  animation: dot-13 var(--animation-duration) step-end infinite;
	}
  
	.hourglass-icon__dot:nth-child(14) {
	  animation: dot-14 var(--animation-duration) step-end infinite;
	}
  
	.hourglass-icon__dot:nth-child(15) {
	  animation: dot-15 var(--animation-duration) step-end infinite;
	}
  
	@keyframes breathe {
	  0% {
		box-shadow:
		  0 0 0 18px rgba(28, 47, 84, 0.3),
		  0 0 0 45px rgba(28, 47, 84, 0.3),
		  0 0 0 75px rgba(28, 47, 84, 0.3),
		  0 0 0 105px rgba(28, 47, 84, 0.3);
	  }
  
	  50% {
		box-shadow:
		  0 0 0 25px rgba(28, 47, 84, 0.3),
		  0 0 0 75px rgba(28, 47, 84, 0.3),
		  0 0 0 125px rgba(28, 47, 84, 0.3),
		  0 0 0 175px rgba(28, 47, 84, 0.3);
	  }
  
	  100% {
		box-shadow:
		  0 0 0 18px rgba(28, 47, 84, 0.3),
		  0 0 0 45px rgba(28, 47, 84, 0.3),
		  0 0 0 75px rgba(28, 47, 84, 0.3),
		  0 0 0 105px rgba(28, 47, 84, 0.3);
	  }
	}
  </style>