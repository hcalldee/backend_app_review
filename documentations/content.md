# Dokumentasi API Content

![Modul](https://img.shields.io/badge/Modul-Content-0ea5e9)
![Status](https://img.shields.io/badge/Status-Aktif-22c55e)
![Format](https://img.shields.io/badge/Response-JSON-f59e0b)

Dokumentasi ini berisi endpoint untuk modul `content` yang dipakai untuk mengelola data film atau series.

## Daftar Isi

- [Ringkasan Endpoint](#ringkasan-endpoint)
- [Ambil Semua Content](#ambil-semua-content)
- [Ambil Content Berdasarkan Id](#ambil-content-berdasarkan-id)
- [Buat Content](#buat-content)
- [Ubah Content](#ubah-content)
- [Hapus Content](#hapus-content)

## Ringkasan Endpoint

| Method | Endpoint | Keterangan |
|---|---|---|
| `GET` | `/api/contents` | Mengambil semua data content |
| `GET` | `/api/contents/:id` | Mengambil detail content berdasarkan UUID |
| `POST` | `/api/contents` | Menambahkan data content baru |
| `PUT` | `/api/contents/:id` | Mengubah data content berdasarkan UUID |
| `DELETE` | `/api/contents/:id` | Menghapus data content berdasarkan UUID |

## Ambil Semua Content

<sub>GitHub biasanya menyediakan tombol copy bawaan pada code block.</sub>

<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#dcfce7;color:#166534;font-weight:600;">GET</span>

| Item | Nilai |
|---|---|
| Endpoint | `/api/contents` |
| Deskripsi | Mengambil seluruh data content |

### Contoh AJAX jQuery

```html
<script>
  function getAllContents() {
    $.ajax({
      url: "http://localhost:5000/api/contents",
      method: "GET",
      success: function (response) {
        console.log("Data semua content:", response);
      },
      error: function (xhr, status, error) {
        console.error("Gagal mengambil semua content:", error);
      }
    });
  }

  getAllContents();
</script>
```

## Ambil Content Berdasarkan Id

<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#dcfce7;color:#166534;font-weight:600;">GET</span>

| Item | Nilai |
|---|---|
| Endpoint | `/api/contents/:id` |
| Deskripsi | Mengambil satu data content berdasarkan UUID |
| Parameter | `id` |

### Contoh AJAX jQuery

```html
<script>
  function getContentById(contentId) {
    $.ajax({
      url: "http://localhost:5000/api/contents/" + contentId,
      method: "GET",
      success: function (response) {
        console.log("Detail content:", response);
      },
      error: function (xhr, status, error) {
        console.error("Gagal mengambil detail content:", error);
      }
    });
  }

  getContentById("uuid-content-di-sini");
</script>
```

## Buat Content

<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#dbeafe;color:#1d4ed8;font-weight:600;">POST</span>

| Item | Nilai |
|---|---|
| Endpoint | `/api/contents` |
| Deskripsi | Membuat data content baru |
| Content-Type | `application/json` |

### Body Request

```json
{
  "title": "Inception",
  "contentType": "movie",
  "synopsis": "Dream inside a dream",
  "posterUrl": "https://example.com/poster.jpg",
  "trailerUrl": "https://youtube.com/watch?v=example",
  "releaseYear": 2010,
  "publisherId": null
}
```

### Contoh AJAX jQuery

```html
<script>
  function createContent() {
    const payload = {
      title: "Inception",
      contentType: "movie",
      synopsis: "Dream inside a dream",
      posterUrl: "https://example.com/poster.jpg",
      trailerUrl: "https://youtube.com/watch?v=example",
      releaseYear: 2010,
      publisherId: null
    };

    $.ajax({
      url: "http://localhost:5000/api/contents",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(payload),
      success: function (response) {
        console.log("Berhasil membuat content:", response);
      },
      error: function (xhr, status, error) {
        console.error("Gagal membuat content:", error);
      }
    });
  }

  createContent();
</script>
```

## Ubah Content

<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#fef3c7;color:#92400e;font-weight:600;">PUT</span>

| Item | Nilai |
|---|---|
| Endpoint | `/api/contents/:id` |
| Deskripsi | Mengubah data content berdasarkan UUID |
| Parameter | `id` |
| Content-Type | `application/json` |

### Body Request

```json
{
  "title": "Interstellar",
  "contentType": "movie",
  "synopsis": "Space exploration mission",
  "posterUrl": "https://example.com/poster.jpg",
  "trailerUrl": "https://youtube.com/watch?v=example",
  "releaseYear": 2014,
  "publisherId": null
}
```

### Contoh AJAX jQuery

```html
<script>
  function updateContent(contentId) {
    const payload = {
      title: "Interstellar",
      contentType: "movie",
      synopsis: "Space exploration mission",
      posterUrl: "https://example.com/poster.jpg",
      trailerUrl: "https://youtube.com/watch?v=example",
      releaseYear: 2014,
      publisherId: null
    };

    $.ajax({
      url: "http://localhost:5000/api/contents/" + contentId,
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify(payload),
      success: function (response) {
        console.log("Berhasil mengubah content:", response);
      },
      error: function (xhr, status, error) {
        console.error("Gagal mengubah content:", error);
      }
    });
  }

  updateContent("uuid-content-di-sini");
</script>
```

## Hapus Content

<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#fee2e2;color:#b91c1c;font-weight:600;">DELETE</span>

| Item | Nilai |
|---|---|
| Endpoint | `/api/contents/:id` |
| Deskripsi | Menghapus data content berdasarkan UUID |
| Parameter | `id` |

### Contoh AJAX jQuery

```html
<script>
  function deleteContent(contentId) {
    $.ajax({
      url: "http://localhost:5000/api/contents/" + contentId,
      method: "DELETE",
      success: function (response) {
        console.log("Berhasil menghapus content:", response);
      },
      error: function (xhr, status, error) {
        console.error("Gagal menghapus content:", error);
      }
    });
  }

  deleteContent("uuid-content-di-sini");
</script>
```
