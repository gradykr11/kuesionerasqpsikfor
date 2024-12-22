document.getElementById('asq-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the name entered by the user
    const name = document.getElementById('name').value;
    if (!name) {
        alert("Harap masukkan nama Anda.");
        return;
    }

    // Get all answers from the form
    const answers = [];
    const formElements = document.querySelectorAll('input[type="radio"]:checked');
    formElements.forEach(input => {
        answers.push({question: input.name, answer: input.value, score: getScore(input.value, parseInt(input.name))});
    });

    // Get the selected gender
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    if (!gender) {
        alert("Harap pilih jenis kelamin Anda.");
        return;
    }

    console.log(gender);

    // Define the items with different scoring
    const differentScoringItems = [2, 4, 5, 6, 7, 9, 12, 13, 16, 18, 19, 20, 21, 22, 23, 26, 33, 35, 39, 41, 42, 43, 45, 46];
    
    let totalScore = 0;

    // Loop through each question and apply the scoring system
    answers.forEach((answer, index) => {
        const score = parseInt(answer.score);
        totalScore += score;
    });

    // Prepare the questions (you can change these to match your actual questions)
    const questions = [
        "1. Saya lebih suka melakukan sesuatu bersama orang lain daripada sendirian.", 
        "2. Saya lebih suka melakukan sesuatu dengan cara yang sama berulang-ulang.", 
        "3. Jika saya mencoba membayangkan sesuatu, saya sangat mudah menciptakan gambar di pikiran saya.",
        "4. Saya sering begitu larut dalam satu hal sehingga mengabaikan hal-hal lain.",
        "5. Saya sering memperhatikan suara-suara kecil yang orang lain tidak perhatikan.",
        "6. Saya biasanya memperhatikan plat nomor mobil atau rangkaian informasi sejenis.",
        "7. Orang lain sering mengatakan bahwa apa yang saya katakan tidak sopan, meskipun menurut saya itu sopan.",
        "8. Ketika saya membaca cerita, saya bisa dengan mudah membayangkan bagaimana rupa para karakter.",
        "9. Saya tertarik dengan tanggal-tanggal.",
        "10. Dalam sebuah kelompok sosial, saya bisa dengan mudah mengikuti percakapan beberapa orang yang berbeda.",
        "11. Saya merasa situasi sosial itu mudah.",
        "12. Saya cenderung memperhatikan detail yang tidak diperhatikan orang lain.",
        "13. Saya lebih suka pergi ke perpustakaan daripada pesta.",
        "14. Saya merasa mudah menciptakan cerita.",
        "15. Saya lebih tertarik pada orang daripada benda.",
        "16. Saya cenderung memiliki minat yang sangat kuat, yang membuat saya kesal jika tidak bisa saya jalani.",
        "17. Saya menikmati obrolan ringan.",
        "18. Ketika saya berbicara, orang lain tidak selalu mudah untuk menyela pembicaraan saya.",
        "19. Saya tertarik pada angka-angka.",
        "20. Ketika saya membaca cerita, saya sulit memahami tujuan karakter-karakternya.",
        "21.Saya tidak terlalu menikmati membaca fiksi.",
        "22. Saya merasa sulit membuat teman baru.",
        "23. Saya selalu memperhatikan pola dalam segala hal.",
        "24. Saya lebih suka pergi ke teater daripada museum.",
        "25. Saya tidak terganggu jika rutinitas harian saya terganggu.",
        "26. Saya sering merasa tidak tahu bagaimana cara melanjutkan percakapan.",
        "27. Saya mudah memahami maksud yang tersirat dari pembicaraan orang lain.",
        "28. Saya biasanya lebih berkonsentrasi pada gambaran keseluruhan, daripada detail kecil.",
        "29. Saya tidak terlalu pandai mengingat nomor telepon.",
        "30. Saya biasanya tidak memperhatikan perubahan kecil dalam situasi atau penampilan seseorang.",
        "31. Saya tahu cara mengetahui jika seseorang yang mendengarkan saya mulai bosan.",
        "32. Saya merasa mudah melakukan lebih dari satu hal sekaligus.",
        "33. Ketika saya berbicara di telepon, saya tidak yakin kapan giliran saya berbicara.",
        "34. Saya menikmati melakukan hal-hal secara spontan.",
        "35. Saya sering menjadi yang terakhir memahami maksud dari sebuah lelucon.",
        "36. Saya merasa mudah untuk mengetahui apa yang seseorang pikirkan atau rasakan hanya dengan melihat wajah mereka.",
        "37. Jika ada gangguan, saya bisa kembali ke apa yang saya lakukan dengan cepat.",
        "38. Saya pandai berbincang-bincang ringan.",
        "39. Orang sering mengatakan bahwa saya terus-menerus membicarakan hal yang sama.",
        "40. Ketika masih kecil, saya suka bermain peran bersama anak-anak lain.",
        "41. Saya suka mengumpulkan informasi tentang kategori benda (misalnya, jenis mobil, jenis burung, jenis kereta, jenis tumbuhan, dll.).",
        "42. Saya merasa sulit membayangkan bagaimana rasanya menjadi orang lain.",
        "43. Saya suka merencanakan setiap kegiatan yang saya ikuti dengan hati-hati.",
        "44. Saya menikmati acara sosial.",
        "45. Saya merasa sulit memahami tujuan orang lain.",
        "46. Situasi baru membuat saya cemas.",
        "47. Saya senang bertemu orang baru.",
        "48. Saya adalah seorang diplomat yang baik.",
        "49. Saya tidak pandai mengingat tanggal lahir orang.",
        "50. Saya merasa sangat mudah bermain permainan dengan anak-anak yang melibatkan peran."
    ];

    // Prepare answers to display
    let answerDetails = '';
    formElements.forEach(input => {
        const questionIndex = input.getAttribute('name');  // Get the question number (from 'name' attribute)
        const questionText = questions[parseInt(questionIndex) - 1];  // Match question by index
        const answerText = input.value; // Display answer based on value

        // Append question and answer to the details
        if (questionText) {
            answerDetails += `${questionText}\nJawaban: ${answerText}\n\n`;
        }
    });

    // Calculate subscale scores
    const socialSkillItems = [1, 11, 13, 15, 22, 36, 44, 45, 47, 48];
    const attentionSwitchingItems = [2, 4, 10, 16, 25, 32, 34, 37, 43, 46];
    const attentionToDetailItems = [5, 6, 9, 12, 19, 23, 28, 29, 30, 49];
    const communicationItems = [7, 17, 18, 26, 27, 31, 33, 35, 38, 39];
    const imaginationItems = [3, 8, 14, 20, 21, 24, 40, 41, 42, 50];

    let socialSkillScore = calculateSubscaleScore(socialSkillItems, answers);
    let attentionSwitchingScore = calculateSubscaleScore(attentionSwitchingItems, answers);
    let attentionToDetailScore = calculateSubscaleScore(attentionToDetailItems, answers);
    let communicationScore = calculateSubscaleScore(communicationItems, answers);
    let imaginationScore = calculateSubscaleScore(imaginationItems, answers);

    // Add interpretation based on gender and score
    let interpretation = '';
    if (gender === 'male') {
        if (totalScore >= 37) {
            interpretation = 'Sangat Mengarah ke Autisme';
        } else if (totalScore >= 26) {
            interpretation = 'Konsisten dengan Autisme';
        } else {
            interpretation = 'Normal';
        }
    } else if (gender === 'female') {
        if (totalScore >= 39) {
            interpretation = 'Sangat Mengarah ke Autisme';
        } else if (totalScore >= 27) {
            interpretation = 'Konsisten dengan Autisme';
        } else {
            interpretation = 'Normal';
        }
    }

    // Prepare subscale interpretations
    const getSubscaleInterpretation = (score, thresholds) => {
        if (score >= thresholds.high) {
            return 'Sangat Mengarah ke Autisme';
        } else if (score >= thresholds.low) {
            return 'Konsisten dengan Autisme';
        } else {
            return 'Normal';
        }
    };

    const socialSkillInterpretation = getSubscaleInterpretation(socialSkillScore, { low: 5, high: 8 });
    const attentionSwitchingInterpretation = getSubscaleInterpretation(attentionSwitchingScore, { low: 6, high: 8 });
    const attentionToDetailInterpretation = getSubscaleInterpretation(attentionToDetailScore, { low: 6, high: 7 });
    const communicationInterpretation = getSubscaleInterpretation(communicationScore, { low: 5, high: 7 });
    const imaginationInterpretation = getSubscaleInterpretation(imaginationScore, { low: 4, high: 6 });

    // Prepare subscale details
    const getSubscaleDetails = (items, answers) => {
        let details = '';
        items.forEach(itemIndex => {
            if (parseInt(answers[itemIndex - 1].score) === 1) {
                details += `${questions[itemIndex - 1]}\n`;
            }
        });
        return details;
    };

    let subscaleDetails = '';
    if (socialSkillInterpretation !== 'Normal') {
        subscaleDetails += `Social Skills Items:\n${getSubscaleDetails(socialSkillItems, answers)}\n`;
    }
    if (attentionSwitchingInterpretation !== 'Normal') {
        subscaleDetails += `Attention Switching Items:\n${getSubscaleDetails(attentionSwitchingItems, answers)}\n`;
    }
    if (attentionToDetailInterpretation !== 'Normal') {
        subscaleDetails += `Attention to Detail Items:\n${getSubscaleDetails(attentionToDetailItems, answers)}\n`;
    }
    if (communicationInterpretation !== 'Normal') {
        subscaleDetails += `Communication Items:\n${getSubscaleDetails(communicationItems, answers)}\n`;
    }
    if (imaginationInterpretation !== 'Normal') {
        subscaleDetails += `Imagination Items:\n${getSubscaleDetails(imaginationItems, answers)}\n`;
    }

    // Prepare results
    let results = `
        Nama: ${name}\n
        Jenis Kelamin: ${gender === 'male' ? 'Laki-laki' : 'Perempuan'}\n\n
        Total Score: ${totalScore}\n
        Social Skills Score: ${socialSkillScore} (${socialSkillInterpretation})\n
        Attention Switching Score: ${attentionSwitchingScore} (${attentionSwitchingInterpretation})\n
        Attention to Detail Score: ${attentionToDetailScore} (${attentionToDetailInterpretation})\n
        Communication Score: ${communicationScore} (${communicationInterpretation})\n
        Imagination Score: ${imaginationScore} (${imaginationInterpretation})\n
        Interpretasi: ${interpretation}\n\n
        Answers:\n${answerDetails}\n
        ${subscaleDetails}
    `;

    // Generate PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFont("times", "normal");
    doc.setFontSize(14);
    doc.setFont("times", "bold");
    doc.text("Hasil Asesmen ASQ Psikfor ID", 105, 10, null, null, "center");
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    const lines = doc.splitTextToSize(results, 160); // Adjust width to fit within margins
    let y = 30; // Start y position after top margin
    lines.forEach(line => {
        if (y > 280) { // Check if the current position exceeds the page height
            doc.addPage();
            y = 30; // Reset y position for the new page after top margin
        }
        doc.text(line, 30, y); // Start text after left margin
        y += 6; // Increment y position for the next line with 1.5 line spacing
    });

    doc.save('ASQ_Results.pdf');
});

// Helper function to calculate subscale scores
function calculateSubscaleScore(items, answers) {
    let score = 0;
    items.forEach(itemIndex => {
        score += parseInt(answers[itemIndex - 1].score); // Adjusting for 0-based indexing
    });
    return score;
}

// Helper function to get score based on answer value
function getScore(value, questionIndex) {
    const differentScoringItems = [2, 4, 5, 6, 7, 9, 12, 13, 16, 18, 19, 20, 21, 22, 23, 26, 33, 35, 39, 41, 42, 43, 45, 46];
    if (differentScoringItems.includes(questionIndex)) {
        if (value === 'Sangat tidak setuju' || value === 'Tidak setuju') {
            return 0;
        } else if (value === 'Setuju' || value === 'Sangat setuju') {
            return 1;
        }
    } else {
        if (value === 'Sangat tidak setuju' || value === 'Tidak setuju') {
            return 1;
        } else if (value === 'Setuju' || value === 'Sangat setuju') {
            return 0;
        }
    }
    return 0;
}
