# Dokumentasi API Publisher

[Kembali ke README](../README.md)

![Modul](https://img.shields.io/badge/Modul-Publisher-0ea5e9)
![Status](https://img.shields.io/badge/Status-Aktif-22c55e)
![Format](https://img.shields.io/badge/Response-JSON-f59e0b)

Dokumentasi ini berisi endpoint untuk modul `publisher` yang dipakai untuk mengelola data publisher film atau series.

## Daftar Isi

- [Ringkasan Endpoint](#ringkasan-endpoint)
- [Ambil Semua Publisher](#ambil-semua-publisher)
- [Ambil Publisher Berdasarkan Id](#ambil-publisher-berdasarkan-id)
- [Cari Publisher](#cari-publisher)
- [Buat Publisher](#buat-publisher)
- [Ubah Publisher](#ubah-publisher)
- [Hapus Publisher](#hapus-publisher)

## Ringkasan Endpoint

| Method | Endpoint | Keterangan |
|---|---|---|
| `GET` | `/api/publishers` | Mengambil semua data publisher |
| `GET` | `/api/publishers/:id` | Mengambil detail publisher berdasarkan UUID |
| `POST` | `/api/publishers/search` | Mencari publisher berdasarkan keyword |
| `POST` | `/api/publishers` | Menambahkan data publisher baru |
| `PUT` | `/api/publishers/:id` | Mengubah data publisher berdasarkan UUID |
| `DELETE` | `/api/publishers/:id` | Menghapus data publisher berdasarkan UUID |

## Ambil Semua Publisher

<sub>GitHub biasanya menyediakan tombol copy bawaan pada code block.</sub>

<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#dcfce7;color:#166534;font-weight:600;">GET</span>

| Item | Nilai |
|---|---|
| Endpoint | `/api/publishers` |
| Deskripsi | Mengambil seluruh data publisher |

### Contoh AJAX jQuery

```html
<script>
  function getAllPublishers() {
    $.ajax({
      url: "http://localhost:5000/api/publishers",
      method: "GET",
      success: function (response) {
        console.log("Data semua publisher:", response);
      },
      error: function (xhr, status, error) {
        console.error("Gagal mengambil semua publisher:", error);
      }
    });
  }

  getAllPublishers();
</script>
```

## Ambil Publisher Berdasarkan Id

<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#dcfce7;color:#166534;font-weight:600;">GET</span>

| Item | Nilai |
|---|---|
| Endpoint | `/api/publishers/:id` |
| Deskripsi | Mengambil satu data publisher berdasarkan UUID |
| Parameter | `id` |

### Contoh AJAX jQuery

```html
<script>
  function getPublisherById(publisherId) {
    $.ajax({
      url: "http://localhost:5000/api/publishers/" + publisherId,
      method: "GET",
      success: function (response) {
        console.log("Detail publisher:", response);
      },
      error: function (xhr, status, error) {
        console.error("Gagal mengambil detail publisher:", error);
      }
    });
  }

  getPublisherById("uuid-publisher-di-sini");
</script>
```

## Cari Publisher

<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#dbeafe;color:#1d4ed8;font-weight:600;">POST</span>

| Item | Nilai |
|---|---|
| Endpoint | `/api/publishers/search` |
| Deskripsi | Mencari data publisher dengan `LIKE` berdasarkan keyword |
| Content-Type | `application/json` |

### Body Request

```json
{
  "keyword": "warner"
}
```

### Contoh AJAX jQuery

```html
<script>
  function searchPublishers() {
    const payload = {
      keyword: "warner"
    };

    $.ajax({
      url: "http://localhost:5000/api/publishers/search",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(payload),
      success: function (response) {
        console.log("Hasil pencarian publisher:", response);
      },
      error: function (xhr, status, error) {
        console.error("Gagal mencari publisher:", error);
      }
    });
  }

  searchPublishers();
</script>
```

## Buat Publisher

<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#dbeafe;color:#1d4ed8;font-weight:600;">POST</span>

| Item | Nilai |
|---|---|
| Endpoint | `/api/publishers` |
| Deskripsi | Membuat data publisher baru |
| Content-Type | `application/json` |

### Body Request

```json
{
  "name": "Warner Bros"
}
```

### Contoh AJAX jQuery

```html
<script>
  function createPublisher() {
    const payload = {
      name: "Warner Bros"
    };

    $.ajax({
      url: "http://localhost:5000/api/publishers",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(payload),
      success: function (response) {
        console.log("Berhasil membuat publisher:", response);
      },
      error: function (xhr, status, error) {
        console.error("Gagal membuat publisher:", error);
      }
    });
  }

  createPublisher();
</script>
```

## Ubah Publisher

<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#fef3c7;color:#92400e;font-weight:600;">PUT</span>

| Item | Nilai |
|---|---|
| Endpoint | `/api/publishers/:id` |
| Deskripsi | Mengubah data publisher berdasarkan UUID |
| Parameter | `id` |
| Content-Type | `application/json` |

### Body Request

```json
{
  "name": "Netflix"
}
```

### Contoh AJAX jQuery

```html
<script>
  function updatePublisher(publisherId) {
    const payload = {
      name: "Netflix"
    };

    $.ajax({
      url: "http://localhost:5000/api/publishers/" + publisherId,
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify(payload),
      success: function (response) {
        console.log("Berhasil mengubah publisher:", response);
      },
      error: function (xhr, status, error) {
        console.error("Gagal mengubah publisher:", error);
      }
    });
  }

  updatePublisher("uuid-publisher-di-sini");
</script>
```

## Hapus Publisher

<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#fee2e2;color:#b91c1c;font-weight:600;">DELETE</span>

| Item | Nilai |
|---|---|
| Endpoint | `/api/publishers/:id` |
| Deskripsi | Menghapus data publisher berdasarkan UUID |
| Parameter | `id` |

### Contoh AJAX jQuery

```html
<script>
  function deletePublisher(publisherId) {
    $.ajax({
      url: "http://localhost:5000/api/publishers/" + publisherId,
      method: "DELETE",
      success: function (response) {
        console.log("Berhasil menghapus publisher:", response);
      },
      error: function (xhr, status, error) {
        console.error("Gagal menghapus publisher:", error);
      }
    });
  }

  deletePublisher("uuid-publisher-di-sini");
</script>
```
