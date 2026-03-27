# Dokumentasi API Content

[Kembali ke README](../README.md)

![Modul](https://img.shields.io/badge/Modul-Content-0ea5e9)
![Status](https://img.shields.io/badge/Status-Aktif-22c55e)
![Format](https://img.shields.io/badge/Response-JSON-f59e0b)

Dokumentasi ini berisi endpoint untuk modul `content` yang dipakai untuk mengelola data film atau series.

## Daftar Isi

- [Ringkasan Endpoint](#ringkasan-endpoint)
- [Ambil Semua Content](#ambil-semua-content)
- [Ambil Content Berdasarkan Id](#ambil-content-berdasarkan-id)
- [Ambil Cast per Content](#ambil-cast-per-content)
- [Tambah Cast ke Content](#tambah-cast-ke-content)
- [Buat Content](#buat-content)
- [Ubah Content](#ubah-content)
- [Hapus Content](#hapus-content)
- [Hapus Cast dari Content](#hapus-cast-dari-content)

## Ringkasan Endpoint

| Method | Endpoint | Keterangan |
|---|---|---|
| `GET` | `/api/contents` | Mengambil semua data content |
| `GET` | `/api/contents/:id` | Mengambil detail content berdasarkan UUID |
| `GET` | `/api/contents/:contentId/casts` | Mengambil daftar cast untuk content |
| `POST` | `/api/contents/:contentId/casts` | Menambahkan cast ke content |
| `POST` | `/api/contents` | Menambahkan data content baru |
| `PUT` | `/api/contents/:id` | Mengubah data content berdasarkan UUID |
| `DELETE` | `/api/contents/:id` | Menghapus data content berdasarkan UUID |
| `DELETE` | `/api/contents/:contentId/casts/:castId` | Menghapus cast dari content |

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

## Ambil Cast per Content

<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#dcfce7;color:#166534;font-weight:600;">GET</span>

| Item | Nilai |
|---|---|
| Endpoint | `/api/contents/:contentId/casts` |
| Deskripsi | Mengambil daftar cast untuk satu content |
| Parameter | `contentId` |

### Contoh AJAX jQuery

```html
<script>
  function getCastsByContentId(contentId) {
    $.ajax({
      url: "http://localhost:5000/api/contents/" + contentId + "/casts",
      method: "GET",
      success: function (response) {
        console.log("Daftar cast content:", response);
      },
      error: function (xhr, status, error) {
        console.error("Gagal mengambil cast content:", error);
      }
    });
  }

  getCastsByContentId("uuid-content-di-sini");
</script>
```

## Tambah Cast ke Content

<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#dbeafe;color:#1d4ed8;font-weight:600;">POST</span>

| Item | Nilai |
|---|---|
| Endpoint | `/api/contents/:contentId/casts` |
| Deskripsi | Menambahkan cast ke satu content |
| Parameter | `contentId` |
| Content-Type | `application/json` |

### Body Request

```json
{
  "castId": "uuid-cast-di-sini",
  "roleName": "Hero (opsional)"
}
```

### Contoh AJAX jQuery

```html
<script>
  function addCastToContent(contentId) {
    const payload = {
      castId: "uuid-cast-di-sini",
      roleName: "Hero"
    };

    $.ajax({
      url: "http://localhost:5000/api/contents/" + contentId + "/casts",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(payload),
      success: function (response) {
        console.log("Berhasil menambah cast ke content:", response);
      },
      error: function (xhr, status, error) {
        console.error("Gagal menambah cast ke content:", error);
      }
    });
  }

  addCastToContent("uuid-content-di-sini");
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

## Hapus Cast dari Content

<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#fee2e2;color:#b91c1c;font-weight:600;">DELETE</span>

| Item | Nilai |
|---|---|
| Endpoint | `/api/contents/:contentId/casts/:castId` |
| Deskripsi | Menghapus cast dari satu content |
| Parameter | `contentId`, `castId` |

### Contoh AJAX jQuery

```html
<script>
  function removeCastFromContent(contentId, castId) {
    $.ajax({
      url: "http://localhost:5000/api/contents/" + contentId + "/casts/" + castId,
      method: "DELETE",
      success: function (response) {
        console.log("Berhasil menghapus cast dari content:", response);
      },
      error: function (xhr, status, error) {
        console.error("Gagal menghapus cast dari content:", error);
      }
    });
  }

  removeCastFromContent("uuid-content-di-sini", "uuid-cast-di-sini");
</script>
```
