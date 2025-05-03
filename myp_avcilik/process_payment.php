<?php
// Veritabanı bağlantısı
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "odeme_sistemi";

// Bağlantıyı oluştur
$conn = new mysqli($servername, $username, $password, $dbname);

// Bağlantıyı kontrol et
if ($conn->connect_error) {
    die("Veritabanı bağlantı hatası: " . $conn->connect_error);
}

// Form verilerini işleme
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $isim = $conn->real_escape_string(trim($_POST['name']));
    $adres = $conn->real_escape_string(trim($_POST['address']));
    $kart_numarasi = $conn->real_escape_string(trim($_POST['card_number']));
    $kart_tarihi = $conn->real_escape_string(trim($_POST['expiry_date']));
    $cvc = $conn->real_escape_string(trim($_POST['cvc']));
    $sepet = $conn->real_escape_string($_POST['sepet']); // JSON formatında

    // Veritabanına ekle
    $sql = "INSERT INTO odeme_bilgileri (isim, adres, kart_numarasi, kart_tarihi, cvc, sepet) 
            VALUES ('$isim', '$adres', '$kart_numarasi', '$kart_tarihi', '$cvc', '$sepet')";

    if ($conn->query($sql) === TRUE) {
        echo "Ödeme bilgileriniz başarıyla alındı!";
    } else {
        echo "Bir hata oluştu: " . $conn->error;
    }
}

// Bağlantıyı kapat
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ödeme Sayfası</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .payment-form {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            width: 300px;
        }
        .payment-form h2 {
            margin-bottom: 20px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
        }
        .form-group input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        .form-group input:focus {
            border-color: #007BFF;
        }
        .submit-btn {
            width: 100%;
            padding: 10px;
            background: #007BFF;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .submit-btn:hover {
            background: #0056b3;
        }
        #sepet-container {
            margin-bottom: 20px;
            padding: 10px;
            background: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        #sepet-container h2 {
            margin: 0 0 10px;
        }
    </style>
</head>
<body>
    <form class="payment-form" action="process_payment.php" method="POST">
        <h2>Ödeme Sayfası</h2>
        <div id="sepet-container">
            <!-- Sepet içerikleri burada gösterilecek -->
        </div>
        <input type="hidden" id="sepet-verisi" name="sepet" value="">
        <div class="form-group">
            <label for="name">İsim Soyisim</label>
            <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
            <label for="address">Adres</label>
            <input type="text" id="address" name="address" required>
        </div>
        <div class="form-group">
            <label for="card_number">Kart Numarası</label>
            <input type="text" id="card_number" name="card_number" maxlength="16" required>
        </div>
        <div class="form-group">
            <label for="expiry_date">Kart Tarihi (MM/YY)</label>
            <input type="text" id="expiry_date" name="expiry_date" maxlength="5" required>
        </div>
        <div class="form-group">
            <label for="cvc">CVC</label>
            <input type="text" id="cvc" name="cvc" maxlength="3" required>
        </div>
        <button type="submit" class="submit-btn">Öde</button>
    </form>

    <script>
        // Ödeme sayfası için sepeti güncelleme
        document.addEventListener('DOMContentLoaded', () => {
            const sepetElemanlari = JSON.parse(localStorage.getItem('sepet')) || [];
            const sepetContainer = document.getElementById('sepet-container');
            const sepetInput = document.getElementById('sepet-verisi');

            let sepetHTML = '<h2>Sepetiniz</h2>';
            sepetElemanlari.forEach(item => {
                sepetHTML += `<p>${item.ad} - ${item.fiyat}₺ x ${item.adet}</p>`;
            });

            sepetContainer.innerHTML = sepetHTML; // Sepet ürünlerini göster
            sepetInput.value = JSON.stringify(sepetElemanlari); // Form için gizli alana veriyi ekle
        });
    </script>
</body>
</html>
