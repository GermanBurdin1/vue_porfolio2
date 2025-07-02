<template>
    <div class="skills-pie-chart">
        <div class="simple-progress-circle" :style="circleStyle">
            <div class="progress-inner">
                <span class="progress-percentage">{{ percentage }}%</span>
                <small class="progress-label">{{ label }}</small>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    percentage: {
        type: Number,
        required: true,
        default: 0
    },
    label: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: '#2563eb'
    }
})

const circleStyle = computed(() => {
    const circumference = 2 * Math.PI * 45 // radius = 45
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (props.percentage / 100) * circumference
    
    return {
        '--stroke-dasharray': strokeDasharray,
        '--stroke-dashoffset': strokeDashoffset,
        '--color': props.color
    }
})
</script>

<style lang="scss" scoped>
.skills-pie-chart {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
}

.simple-progress-circle {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: conic-gradient(
        var(--color, #2563eb) calc(var(--percentage, 0) * 1%), 
        #e5e7eb 0
    );
    display: flex;
    align-items: center;
    justify-content: center;
    
    &::before {
        content: '';
        position: absolute;
        width: 80px;
        height: 80px;
        background: white;
        border-radius: 50%;
    }
}

.progress-inner {
    position: relative;
    z-index: 1;
    text-align: center;
}

.progress-percentage {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    line-height: 1;
}

.progress-label {
    display: block;
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

@media (max-width: 768px) {
    .simple-progress-circle {
        width: 100px;
        height: 100px;
        
        &::before {
            width: 70px;
            height: 70px;
        }
    }
    
    .progress-percentage {
        font-size: 1.25rem;
    }
    
    .progress-label {
        font-size: 0.7rem;
    }
}
</style>