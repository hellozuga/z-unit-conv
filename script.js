// Conversion constants
const METRES_TO_FEET = 3.28084;
const FEET_TO_INCHES = 12;
const MILLIMETRES_TO_FEET = 0.00328084;
const SQUARE_METRES_TO_SQUARE_FEET = 10.7639;
const SQUARE_MM_TO_SQUARE_FEET = 1.07639e-5;

// Current conversion type and direction
let currentConversion = '';
let isReversed = false;

// Helper function to format feet and inches as 5' 6"
function formatFeetInches(totalFeet) {
    if (isNaN(totalFeet) || totalFeet < 0) {
        return "—";
    }
    
    const feet = Math.floor(totalFeet);
    const inches = Math.round((totalFeet - feet) * FEET_TO_INCHES);
    
    if (feet === 0 && inches === 0) {
        return "0' 0\"";
    }
    
    let result = "";
    if (feet > 0) {
        result += feet + "'";
    }
    if (inches > 0 || feet === 0) {
        if (result) result += " ";
        result += inches + "\"";
    }
    
    return result;
}

// Helper function to convert feet and inches to decimal feet
function feetInchesToDecimalFeet(feet, inches) {
    feet = parseFloat(feet) || 0;
    inches = parseFloat(inches) || 0;
    return feet + (inches / FEET_TO_INCHES);
}

// Show/hide conversion sections based on selection
function showConversionSection() {
    // Hide all sections
    document.querySelectorAll('.converter-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show container
    const container = document.getElementById('converter-container');
    const reverseBtn = document.getElementById('reverse-btn');
    
    if (!currentConversion) {
        container.style.display = 'none';
        reverseBtn.style.display = 'none';
        return;
    }
    
    container.style.display = 'block';
    reverseBtn.style.display = 'block';
    
    // Determine which section to show
    let sectionId = '';
    
    if (!isReversed) {
        sectionId = currentConversion + '-section';
    } else {
        // Reverse mappings
        const reverseMap = {
            'mm-to-ft': 'ft-to-mm-section',
            'm-to-ft': 'ft-to-m-section',
            'sq-mm-to-sq-ft': 'sq-ft-to-sq-mm-section',
            'sq-m-to-sq-ft': 'sq-ft-to-sq-m-section'
        };
        sectionId = reverseMap[currentConversion];
    }
    
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block';
        
        // Show copy buttons when section is active
        section.querySelectorAll('.copy-btn').forEach(btn => {
            btn.style.display = 'block';
        });
    }
}

// Conversion: MM to Feet/Inches
function convertMMToFeetInches() {
    const mm = parseFloat(document.getElementById('mm-input').value);
    const output = document.getElementById('mm-output');
    const copyBtn = document.querySelector('[data-target="mm-output"]');
    
    if (isNaN(mm) || mm < 0) {
        output.textContent = "—";
        return;
    }
    
    const totalFeet = mm * MILLIMETRES_TO_FEET;
    output.textContent = formatFeetInches(totalFeet);
}

// Conversion: Metres to Feet/Inches
function convertMToFeetInches() {
    const metres = parseFloat(document.getElementById('m-input').value);
    const output = document.getElementById('m-output');
    
    if (isNaN(metres) || metres < 0) {
        output.textContent = "—";
        return;
    }
    
    const totalFeet = metres * METRES_TO_FEET;
    output.textContent = formatFeetInches(totalFeet);
}

// Conversion: Feet/Inches to MM
function convertFeetInchesToMM() {
    const feet = document.getElementById('ft-input').value;
    const inches = document.getElementById('inches-input').value;
    const output = document.getElementById('ft-output');
    
    const decimalFeet = feetInchesToDecimalFeet(feet, inches);
    
    if (decimalFeet < 0 || (feet === '' && inches === '')) {
        output.textContent = "—";
        return;
    }
    
    const mm = (decimalFeet / METRES_TO_FEET) * 1000;
    output.textContent = Math.round(mm) + " mm";
}

// Conversion: Feet/Inches to Metres
function convertFeetInchesToM() {
    const feet = document.getElementById('ft-m-input').value;
    const inches = document.getElementById('inches-m-input').value;
    const output = document.getElementById('ft-m-output');
    
    const decimalFeet = feetInchesToDecimalFeet(feet, inches);
    
    if (decimalFeet < 0 || (feet === '' && inches === '')) {
        output.textContent = "—";
        return;
    }
    
    const metres = decimalFeet / METRES_TO_FEET;
    output.textContent = metres.toFixed(2) + " m";
}

// Conversion: Square MM to Square Feet
function convertSqMMToSqFeet() {
    const sqMM = parseFloat(document.getElementById('sq-mm-input').value);
    const output = document.getElementById('sq-mm-output');
    
    if (isNaN(sqMM) || sqMM < 0) {
        output.textContent = "—";
        return;
    }
    
    const sqFeet = sqMM * SQUARE_MM_TO_SQUARE_FEET;
    output.textContent = Math.round(sqFeet) + " sq ft";
}

// Conversion: Square Metres to Square Feet
function convertSqMToSqFeet() {
    const sqMetres = parseFloat(document.getElementById('sq-m-input').value);
    const output = document.getElementById('sq-m-output');
    
    if (isNaN(sqMetres) || sqMetres < 0) {
        output.textContent = "—";
        return;
    }
    
    const sqFeet = sqMetres * SQUARE_METRES_TO_SQUARE_FEET;
    output.textContent = Math.round(sqFeet) + " sq ft";
}

// Conversion: Square Feet to Square MM
function convertSqFeetToSqMM() {
    const sqFeet = parseFloat(document.getElementById('sq-ft-mm-input').value);
    const output = document.getElementById('sq-ft-mm-output');
    
    if (isNaN(sqFeet) || sqFeet < 0) {
        output.textContent = "—";
        return;
    }
    
    const sqMM = sqFeet / SQUARE_MM_TO_SQUARE_FEET;
    output.textContent = Math.round(sqMM) + " mm²";
}

// Conversion: Square Feet to Square Metres
function convertSqFeetToSqM() {
    const sqFeet = parseFloat(document.getElementById('sq-ft-m-input').value);
    const output = document.getElementById('sq-ft-m-output');
    
    if (isNaN(sqFeet) || sqFeet < 0) {
        output.textContent = "—";
        return;
    }
    
    const sqMetres = sqFeet / SQUARE_METRES_TO_SQUARE_FEET;
    output.textContent = sqMetres.toFixed(2) + " m²";
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Visual feedback could be added here
    }).catch(err => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Failed to copy');
        }
        document.body.removeChild(textarea);
    });
}

// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const isDarkMode = body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme preference
    loadTheme();
    
    // Theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Icon button selectors
    const iconButtons = document.querySelectorAll('.icon-btn');
    iconButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            iconButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get conversion type from data attribute
            currentConversion = this.getAttribute('data-conversion');
            isReversed = false;
            showConversionSection();
            
            // Show reverse button
            document.getElementById('reverse-btn').style.display = 'block';
            
            // Clear all inputs when changing conversion type
            document.querySelectorAll('input[type="number"]').forEach(input => {
                input.value = '';
            });
            document.querySelectorAll('.output').forEach(output => {
                output.textContent = "—";
            });
        });
    });
    
    // Reverse button
    const reverseBtn = document.getElementById('reverse-btn');
    reverseBtn.addEventListener('click', function() {
        if (currentConversion) {
            isReversed = !isReversed;
            showConversionSection();
            
            // Clear inputs when reversing
            document.querySelectorAll('input[type="number"]').forEach(input => {
                input.value = '';
            });
            document.querySelectorAll('.output').forEach(output => {
                output.textContent = "—";
            });
        }
    });
    
    // Input event listeners
    document.getElementById('mm-input').addEventListener('input', convertMMToFeetInches);
    document.getElementById('m-input').addEventListener('input', convertMToFeetInches);
    document.getElementById('ft-input').addEventListener('input', convertFeetInchesToMM);
    document.getElementById('inches-input').addEventListener('input', convertFeetInchesToMM);
    document.getElementById('ft-m-input').addEventListener('input', convertFeetInchesToM);
    document.getElementById('inches-m-input').addEventListener('input', convertFeetInchesToM);
    document.getElementById('sq-mm-input').addEventListener('input', convertSqMMToSqFeet);
    document.getElementById('sq-m-input').addEventListener('input', convertSqMToSqFeet);
    document.getElementById('sq-ft-mm-input').addEventListener('input', convertSqFeetToSqMM);
    document.getElementById('sq-ft-m-input').addEventListener('input', convertSqFeetToSqM);
    
    // Copy button listeners
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const output = document.getElementById(targetId);
            if (output && output.textContent !== "—") {
                copyToClipboard(output.textContent);
            }
        });
    });
});
