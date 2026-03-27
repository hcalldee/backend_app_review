# Dokumentasi API Review

[Kembali ke README](../README.md)

![Modul](https://img.shields.io/badge/Modul-Review-0ea5e9)
![Status](https://img.shields.io/badge/Status-Aktif-22c55e)
![Format](https://img.shields.io/badge/Response-JSON-f59e0b)

Dokumentasi ini berisi endpoint untuk modul `review` yang dipakai untuk mengelola review singkat film atau series.

## Daftar Isi

- [Ringkasan Endpoint](#ringkasan-endpoint)
- [Ambil Semua Review](#ambil-semua-review)
- [Ambil Review Berdasarkan Id](#ambil-review-berdasarkan-id)
- [Buat Review](#buat-review)
- [Ubah Review](#ubah-review)
- [Hapus Review](#hapus-review)

## Ringkasan Endpoint

| Method | Endpoint | Keterangan |
|---|---|---|
| `GET` | `/api/reviews` | Mengambil semua data review |
| `GET` | `/api/reviews/:id` | Mengambil detail review berdasarkan UUID |
| `POST` | `/api/reviews` | Menambahkan review baru |
| `PUT` | `/api/reviews/:id` | Mengubah review berdasarkan UUID |
| `DELETE` | `/api/reviews/:id` | Menghapus review berdasarkan UUID |

## Ambil Semua Review

<sub>GitHub biasanya menyediakan tombol copy bawaan pada code block.</sub>

<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#dcfce7;color:#166534;font-weight:600;">GET</span>

| Item | Nilai |
|---|---|
| Endpoint | `/api/reviews` |
| Deskripsi | Mengambil seluruh data review |

### Contoh AJAX jQuery

```html
<script>
  function getAllReviews() {
    $.ajax({
      url: "http://localhost:5000/api/reviews",
      method: "GET",
      success: function (response) {
        console.log("Data semua review:", response);
      },
      error: function (xhr, status, error) {
        console.error("Gagal mengambil semua review:", error);
      }
    });
  }

  getAllReviews();
</script>
```

## Ambil Review Berdasarkan Id

<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#dcfce7;color:#166534;font-weight:600;">GET</span>

| Item | Nilai |
|---|---|
| Endpoint | `/api/reviews/:id` |
| Deskripsi | Mengambil satu data review berdasarkan UUID |
| Parameter | `id` |

### Contoh AJAX jQuery

```html
<script>
  function getReviewById(reviewId) {
    $.ajax({
      url: "http://localhost:5000/api/reviews/" + reviewId,
      method: "GET",
      success: function (response) {
        console.log("Detail review:", response);
      },
      error: function (xhr, status, error) {
        console.error("Gagal mengambil detail review:", error);
      }
    });
  }

  getReviewById("uuid-review-di-sini");
</script>
```

## Buat Review

<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#dbeafe;color:#1d4ed8;font-weight:600;">POST</span>

| Item | Nilai |
|---|---|
| Endpoint | `/api/reviews` |
| Deskripsi | Membuat data review baru |
| Content-Type | `application/json` |
| Catatan | `comment` maksimal `120` karakter dan `rating` harus `1-5` dengan kenaikan `0.5` |

### Body Request

```json
{
  "contentId": "uuid-content-di-sini",
  "comment": "Filmnya seru dan visualnya keren.",
  "rating": 4.5
}
```

### Contoh AJAX jQuery

```html
<script>
  function createReview() {
    const payload = {
      contentId: "uuid-content-di-sini",
      comment: "Filmnya seru dan visualnya keren.",
      rating: 4.5
    };

    $.ajax({
      url: "http://localhost:5000/api/reviews",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(payload),
      success: function (response) {
        console.log("Berhasil membuat review:", response);
      },
      error: function (xhr, status, error) {
        console.error("Gagal membuat review:", error);
      }
    });
  }

  createReview();
</script>
```

## Ubah Review

<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#fef3c7;color:#92400e;font-weight:600;">PUT</span>

| Item | Nilai |
|---|---|
| Endpoint | `/api/reviews/:id` |
| Deskripsi | Mengubah data review berdasarkan UUID |
| Parameter | `id` |
| Content-Type | `application/json` |
| Catatan | `comment` maksimal `120` karakter dan `rating` harus `1-5` dengan kenaikan `0.5` |

### Body Request

```json
{
  "contentId": "uuid-content-di-sini",
  "comment": "Lebih bagus dari ekspektasi.",
  "rating": 5
}
```

### Contoh AJAX jQuery

```html
<script>
  function updateReview(reviewId) {
    const payload = {
      contentId: "uuid-content-di-sini",
      comment: "Lebih bagus dari ekspektasi.",
      rating: 5
    };

    $.ajax({
      url: "http://localhost:5000/api/reviews/" + reviewId,
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify(payload),
      success: function (response) {
        console.log("Berhasil mengubah review:", response);
      },
      error: function (xhr, status, error) {
        console.error("Gagal mengubah review:", error);
      }
    });
  }

  updateReview("uuid-review-di-sini");
</script>
```

## Hapus Review

<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#fee2e2;color:#b91c1c;font-weight:600;">DELETE</span>

| Item | Nilai |
|---|---|
| Endpoint | `/api/reviews/:id` |
| Deskripsi | Menghapus data review berdasarkan UUID |
| Parameter | `id` |

### Contoh AJAX jQuery

```html
<script>
  function deleteReview(reviewId) {
    $.ajax({
      url: "http://localhost:5000/api/reviews/" + reviewId,
      method: "DELETE",
      success: function (response) {
        console.log("Berhasil menghapus review:", response);
      },
      error: function (xhr, status, error) {
        console.error("Gagal menghapus review:", error);
      }
    });
  }

  deleteReview("uuid-review-di-sini");
</script>
```
