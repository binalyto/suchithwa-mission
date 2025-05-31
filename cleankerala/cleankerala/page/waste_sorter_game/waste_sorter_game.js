// frappe.pages['waste-sorter-game'].on_page_load = function(wrapper) {
// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: 'Waste Sorter Game',
// 		single_column: true
// 	});
// }






// frappe.pages['waste-sorter-game'].on_page_load = function(wrapper) {
//     const page = frappe.ui.make_app_page({
//         parent: wrapper,
//         single_column: true
//     });

//     // Hide default title bar (if exists)
//     if (page.page && page.page.wrapper) {
//         $(page.page.wrapper).find('.page-head').hide();
//     }
    
//     // // Hide Navebar
//     // $('.navbar').hide();



//     // Logo Bar HTML
//     const header = `
//         <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 30px; background-color: #004d40;">
//             <img src="/files/logo-left.png" style="height:60px;" alt="Left Logo">
//             <img src="/files/logo-right.png" style="height:60px;" alt="Right Logo">
//         </div>
//     `;

//     // Game HTML
//     const gameHTML = `
//         <div class="waste-sorter-wrapper" style="padding: 20px;">
//             <h2 style="text-align: center; color: #00695c;">മാലിന്യ നിർവചനം: ശരിയായ ബിനിലേക്ക് വസ്തുക്കൾ വലിച്ചിടുക</h2>
//             <p style="text-align: center;">ചുവടെയുള്ള വസ്തുക്കൾ ശരിയായ ബിനിലേക്ക് വലിച്ചിടുക:</p>

//             <div id="items" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin: 20px 0;"></div>

//             <div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px;">
//                 <div class="dropzone" data-type="biodegradable" style="border: 2px dashed #4caf50; padding: 20px; border-radius: 8px; min-width: 120px; text-align: center; font-size: 18px; cursor: pointer;">🗑️ ജൈവമാലിന്യം</div>
//                 <div class="dropzone" data-type="recyclable" style="border: 2px dashed #2196f3; padding: 20px; border-radius: 8px; min-width: 120px; text-align: center; font-size: 18px; cursor: pointer;">♻️ പുനരുപയോഗം ചെയ്യാവുന്നത്</div>
//                 <div class="dropzone" data-type="non-recyclable" style="border: 2px dashed #f44336; padding: 20px; border-radius: 8px; min-width: 120px; text-align: center; font-size: 18px; cursor: pointer;">❌ പുനരുപയോഗം ചെയ്യാനാകാത്തത്</div>
//                 <div class="dropzone" data-type="hazardous" style="border: 2px dashed #ff9800; padding: 20px; border-radius: 8px; min-width: 120px; text-align: center; font-size: 18px; cursor: pointer;">⚠️ അപകടം നൽകുന്നവ</div>
//             </div>

//             <div id="timer" style="text-align:center; font-size:20px; color:#d32f2f; margin-top: 30px;">Time Left: 60s</div>
//             <div id="score" style="margin-top: 15px; text-align: center; font-size: 18px;"></div>
//         </div>
//     `;

//     // Insert header and game HTML into page body
//     $(wrapper).prepend(header);
//     $(page.body).append(gameHTML);

//     const items = [
//         { label: "പ്ലാസ്റ്റിക് കുപ്പി", type: "recyclable" },
//         { label: "പച്ചക്കറി തോൽ", type: "biodegradable" },
//         { label: "ബാറ്ററി", type: "hazardous" },
//         { label: "കല്ല്", type: "non-recyclable" },
//         { label: "ടിഷ്യൂ", type: "biodegradable" },
//         { label: "ഗ്ലാസ് കുപ്പി", type: "recyclable" },
//         { label: "ചില്ലുപാത്രം", type: "non-recyclable" },
//         { label: "ഷാമ്പൂ കുപ്പി", type: "recyclable" },
//         { label: "ഇഞ്ചക്ഷൻ സൂചി", type: "hazardous" },
//         { label: "പേപ്പർ", type: "recyclable" }
//     ];

//     let correct = 0;

//     // Render draggable items
//     items.forEach((item, index) => {
//         $('#items').append(`
//             <div class="draggable-item" draggable="true" data-type="${item.type}" style="
//                 padding: 10px 15px;
//                 background: #e0f2f1;
//                 border: 1px solid #26a69a;
//                 border-radius: 6px;
//                 cursor: grab;
//                 font-size: 16px;
//                 text-align: center;
//                 margin: 5px;
//             ">${item.label}</div>
//         `);
//     });

//     // Timer setup
//     let timeLeft = 60; // seconds (you can change this)
//     let timerInterval = null;

//     function updateTimer() {
//         timeLeft--;
//         $('#timer').text(`Time Left: ${timeLeft}s`);
//         if (timeLeft <= 0) {
//             clearInterval(timerInterval);
//             endGame(false); // fail due to timeout
//         }
//     }

//     timerInterval = setInterval(updateTimer, 1000);

//     function endGame(success) {
//         // Disable drag and drop events
//         $(document).off('dragstart', '.draggable-item');
//         $(document).off('dragend', '.draggable-item');
//         $(document).off('dragover', '.dropzone');
//         $(document).off('dragleave', '.dropzone');
//         $(document).off('drop', '.dropzone');

//         if (success) {
//             $('#score').html(`<h3>🎉 നിങ്ങള്‍ വിജയിച്ചു! എല്ലാ വസ്തുക്കളും ശരിയായ ബിനിലേക്ക് വലിച്ചിട്ടു. 🥳🥳</h3>`);
//             setTimeout(() => {
//                 frappe.set_route('congratulation');
//             }, 3000);
//         } else {
//             $('#score').html(`<h3>⏰ സമയം കഴിഞ്ഞു!<br> ക്ഷമിക്കണം, നിങ്ങൾ പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കുക 🙁.</h3>`);
//         }
//     }

//     // Drag and Drop Event Handlers (event delegation)
//     $(document).on('dragstart', '.draggable-item', function (e) {
//         e.originalEvent.dataTransfer.setData('text/plain', $(this).data('type'));
//         e.originalEvent.dataTransfer.setData('id', $(this).index());
//         $(this).css('opacity', '0.5');
//     });

//     $(document).on('dragend', '.draggable-item', function () {
//         $(this).css('opacity', '1');
//     });

//     $(document).on('dragover', '.dropzone', function (e) {
//         e.preventDefault();
//         $(this).css('background', '#c8e6c9');
//     });

//     $(document).on('dragleave', '.dropzone', function () {
//         $(this).css('background', '');
//     });

//     $(document).on('drop', '.dropzone', function (e) {
//         e.preventDefault();
//         $(this).css('background', '');
//         const dropType = $(this).data('type');
//         const draggedType = e.originalEvent.dataTransfer.getData('text/plain');
//         const draggedIndex = e.originalEvent.dataTransfer.getData('id');
//         const itemElem = $('.draggable-item').eq(draggedIndex);

//         if (dropType === draggedType) {
//             frappe.show_alert({ message: "✅ ശരിയാണ്! 😊", indicator: 'green' });
//             itemElem.remove();
//             correct++;
//         } else {
//             frappe.show_alert({ message: "❌ തെറ്റാണ്! 😟", indicator: 'red' });
//         }

//         if (correct === items.length) {
//             clearInterval(timerInterval);
//             endGame(true);
//         }
//     });
// };






frappe.pages['waste-sorter-game'].on_page_load = function(wrapper) {
    const page = frappe.ui.make_app_page({
        parent: wrapper,
        single_column: true
    });

    if (page.page && page.page.wrapper) {
        $(page.page.wrapper).find('.page-head').hide();
    }

    const header = `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 30px; background-color: #004d40;">
            <img src="/files/logo-left.png" style="height:60px;" alt="Left Logo">
            <img src="/files/logo-right.png" style="height:60px;" alt="Right Logo">
        </div>
    `;

    const gameHTML = `
        <div class="waste-sorter-wrapper" style="padding: 20px;">
            <h2 style="text-align: center; color: #00695c;">മാലിന്യ നിർവചനം: ശരിയായ ബിനിലേക്ക് വസ്തുക്കൾ വലിച്ചിടുക</h2>
            <p style="text-align: center;">ചുവടെയുള്ള വസ്തുക്കൾ ശരിയായ ബിനിലേക്ക് വലിച്ചിടുക:</p>

            <div id="items" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin: 20px 0;"></div>

            <div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px;">
                <div class="dropzone" data-type="biodegradable" style="border: 2px dashed #4caf50; padding: 20px; border-radius: 8px; min-width: 120px; text-align: center; font-size: 18px; cursor: pointer;">🗑️ ജൈവമാലിന്യം</div>
                <div class="dropzone" data-type="recyclable" style="border: 2px dashed #2196f3; padding: 20px; border-radius: 8px; min-width: 120px; text-align: center; font-size: 18px; cursor: pointer;">♻️ പുനരുപയോഗം ചെയ്യാവുന്നത്</div>
                <div class="dropzone" data-type="non-recyclable" style="border: 2px dashed #f44336; padding: 20px; border-radius: 8px; min-width: 120px; text-align: center; font-size: 18px; cursor: pointer;">❌ പുനരുപയോഗം ചെയ്യാനാകാത്തത്</div>
                <div class="dropzone" data-type="hazardous" style="border: 2px dashed #ff9800; padding: 20px; border-radius: 8px; min-width: 120px; text-align: center; font-size: 18px; cursor: pointer;">⚠️ അപകടം നൽകുന്നവ</div>
            </div>

            <div id="timer" style="text-align:center; font-size:20px; color:#d32f2f; margin-top: 30px;">Time Left: 60s</div>
            <div id="score" style="margin-top: 15px; text-align: center; font-size: 18px;"></div>
        </div>
    `;

    $(wrapper).prepend(header);
    $(page.body).append(gameHTML);

    const items = [
        { label: "പ്ലാസ്റ്റിക് കുപ്പി", type: "recyclable" },
        { label: "പച്ചക്കറി തോൽ", type: "biodegradable" },
        { label: "ബാറ്ററി", type: "hazardous" },
        { label: "കല്ല്", type: "non-recyclable" },
        { label: "ടിഷ്യൂ", type: "biodegradable" },
        { label: "ഗ്ലാസ് കുപ്പി", type: "recyclable" },
        { label: "ചില്ലുപാത്രം", type: "non-recyclable" },
        { label: "ഷാമ്പൂ കുപ്പി", type: "recyclable" },
        { label: "ഇഞ്ചക്ഷൻ സൂചി", type: "hazardous" },
        { label: "പേപ്പർ", type: "recyclable" }
    ];

    let correct = 0;

    items.forEach(item => {
        $('#items').append(`
            <div class="draggable-item" data-type="${item.type}" style="
                padding: 10px 15px;
                background: #e0f2f1;
                border: 1px solid #26a69a;
                border-radius: 6px;
                cursor: grab;
                font-size: 16px;
                text-align: center;
                margin: 5px;
                touch-action: none;
                user-select: none;
                -webkit-user-select: none;
                position: relative;
            ">${item.label}</div>
        `);
    });

    // Timer
    let timeLeft = 60;
    let timerInterval = setInterval(() => {
        timeLeft--;
        $('#timer').text(`Time Left: ${timeLeft}s`);
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame(false);
        }
    }, 1000);

    function endGame(success) {
        if (window.interact) {
            interact('.draggable-item').unset();
            interact('.dropzone').unset();
        }

        if (success) {
            $('#score').html(`<h3>🎉 നിങ്ങള്‍ വിജയിച്ചു! എല്ലാ വസ്തുക്കളും ശരിയായ ബിനിലേക്ക് വലിച്ചിട്ടു. 🥳🥳</h3>`);
            setTimeout(() => {
                frappe.set_route('congratulation');
            }, 3000);
        } else {
            $('#score').html(`<h3>⏰ സമയം കഴിഞ്ഞു!<br> ക്ഷമിക്കണം, നിങ്ങൾ പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കുക 🙁.</h3>`);
        }
    }

    // Load interact.js
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/interactjs/dist/interact.min.js';
    script.onload = () => {
        interact('.draggable-item').draggable({
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true
                })
            ],
            autoScroll: true,
            listeners: {
                move(event) {
                    const target = event.target;
                    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    target.style.transform = `translate(${x}px, ${y}px)`;
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                },
                end(event) {
                    // If not dropped on dropzone, reset position
                    if (!event.dropzone) {
                        resetPosition(event.target);
                    }
                }
            }
        });

        interact('.dropzone').dropzone({
            overlap: 0.5,
            ondropactivate(event) {
                event.target.classList.add('drop-active');
            },
            ondragenter(event) {
                event.target.classList.add('drop-target');
            },
            ondragleave(event) {
                event.target.classList.remove('drop-target');
            },
            ondrop(event) {
                const dragged = event.relatedTarget;
                const dropzone = event.target;
                const dropType = $(dropzone).data('type');
                const draggedType = $(dragged).data('type');

                if (dropType === draggedType) {
                    frappe.show_alert({ message: "✅ ശരിയാണ്! 😊", indicator: 'green' });
                    $(dragged).remove();
                    correct++;
                    if (correct === items.length) {
                        clearInterval(timerInterval);
                        endGame(true);
                    }
                } else {
                    frappe.show_alert({ message: "❌ തെറ്റാണ്! 😟", indicator: 'red' });
                    resetPosition(dragged);
                }
            },
            ondropdeactivate(event) {
                event.target.classList.remove('drop-active');
                event.target.classList.remove('drop-target');
            }
        });
    };

    document.head.appendChild(script);

    function resetPosition(el) {
        el.style.transform = 'translate(0px, 0px)';
        el.setAttribute('data-x', 0);
        el.setAttribute('data-y', 0);
    }
};

