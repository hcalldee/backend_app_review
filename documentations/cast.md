# Dokumentasi API Cast

[Kembali ke README](../README.md)

![Modul](https://img.shields.io/badge/Modul-Cast-0ea5e9)
![Status](https://img.shields.io/badge/Status-Aktif-22c55e)
![Format](https://img.shields.io/badge/Response-JSON-f59e0b)

Dokumentasi ini berisi endpoint untuk modul `cast` yang dipakai untuk mengelola data pemeran film atau series.

## Daftar Isi

- [Ringkasan Endpoint](#ringkasan-endpoint)
- [Ambil Semua Cast](#ambil-semua-cast)
- [Ambil Cast Berdasarkan Id](#ambil-cast-berdasarkan-id)
- [Cari Cast](#cari-cast)
- [Buat Cast](#buat-cast)
- [Ubah Cast](#ubah-cast)
- [Hapus Cast](#hapus-cast)

## Ringkasan Endpoint

| Method | Endpoint | Keterangan |
|---|---|---|
| `GET` | `/api/casts` | Mengambil semua data cast |
| `GET` | `/api/casts/:id` | Mengambil detail cast berdasarkan UUID |
| `POST` | `/api/casts/search` | Mencari cast berdasarkan keyword |
| `POST` | `/api/casts` | Menambahkan data cast baru |
| `PUT` | `/api/casts/:id` | Mengubah data cast berdasarkan UUID |
| `DELETE` | `/api/casts/:id` | Menghapus data cast berdasarkan UUID |

## Ambil Semua Cast

<sub>GitHub biasanya menyediakan tombol copy bawaan pada code block.</sub>

<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#dcfce7;color:#166534;font-weight:600;">GET</span>

| Item | Nilai |
|---|---|
| Endpoint | `/api/casts` |
| Deskripsi | Mengambil seluruh data cast |

### Contoh AJAX jQuery

```html
<script>
  function getAllCasts() {
    $.ajax({
      url: "http://localhost:5000/api/casts",
      method: "GET",
      success: function (response) {
        console.log("Data semua cast:", response);
      },
      error: function (xhr, status, error) {
        console.error("Gagal mengambil semua cast:", error);
      }
    });
  }

  getAllCasts();
</script>
```

## Ambil Cast Berdasarkan Id

<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#dcfce7;color:#166534;font-weight:600;">GET</span>

| Item | Nilai |
|---|---|
| Endpoint | `/api/casts/:id` |
| Deskripsi | Mengambil satu data cast berdasarkan UUID |
| Parameter | `id` |

### Contoh AJAX jQuery

```html
<script>
  function getCastById(castId) {
    $.ajax({
      url: "http://localhost:5000/api/casts/" + castId,
      method: "GET",
      success: function (response) {
        console.log("Detail cast:", response);
      },
      error: function (xhr, status, error) {
        console.error("Gagal mengambil detail cast:", error);
      }
    });
  }

  getCastById("uuid-cast-di-sini");
</script>
```

## Cari Cast

<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#dbeafe;color:#1d4ed8;font-weight:600;">POST</span>

| Item | Nilai |
|---|---|
| Endpoint | `/api/casts/search` |
| Deskripsi | Mencari data cast dengan `LIKE` berdasarkan keyword |
| Content-Type | `application/json` |

### Body Request

```json
{
  "keyword": "tom"
}
```

### Contoh AJAX jQuery

```html
<script>
  function searchCasts() {
    const payload = {
      keyword: "tom"
    };

    $.ajax({
      url: "http://localhost:5000/api/casts/search",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(payload),
      success: function (response) {
        console.log("Hasil pencarian cast:", response);
      },
      error: function (xhr, status, error) {
        console.error("Gagal mencari cast:", error);
      }
    });
  }

  searchCasts();
</script>
```

## Buat Cast

<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#dbeafe;color:#1d4ed8;font-weight:600;">POST</span>

| Item | Nilai |
|---|---|
| Endpoint | `/api/casts` |
| Deskripsi | Membuat data cast baru |
| Content-Type | `application/json` |

### Body Request

```json
{
  "name": "Tom Holland",
  "dob": "1996-06-01",
  "nationality": "British"
}
```

### Contoh AJAX jQuery

```html
<script>
  function createCast() {
    const payload = {
      name: "Tom Holland",
      dob: "1996-06-01",
      nationality: "British"
    };

    $.ajax({
      url: "http://localhost:5000/api/casts",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(payload),
      success: function (response) {
        console.log("Berhasil membuat cast:", response);
      },
      error: function (xhr, status, error) {
        console.error("Gagal membuat cast:", error);
      }
    });
  }

  createCast();
</script>
```

## Ubah Cast

<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#fef3c7;color:#92400e;font-weight:600;">PUT</span>

| Item | Nilai |
|---|---|
| Endpoint | `/api/casts/:id` |
| Deskripsi | Mengubah data cast berdasarkan UUID |
| Parameter | `id` |
| Content-Type | `application/json` |

### Body Request

```json
{
  "name": "Scarlett Johansson",
  "dob": "1984-11-22",
  "nationality": "American"
}
```

### Contoh AJAX jQuery

```html
<script>
  function updateCast(castId) {
    const payload = {
      name: "Scarlett Johansson",
      dob: "1984-11-22",
      nationality: "American"
    };

    $.ajax({
      url: "http://localhost:5000/api/casts/" + castId,
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify(payload),
      success: function (response) {
        console.log("Berhasil mengubah cast:", response);
      },
      error: function (xhr, status, error) {
        console.error("Gagal mengubah cast:", error);
      }
    });
  }

  updateCast("uuid-cast-di-sini");
</script>
```

## Hapus Cast

<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#fee2e2;color:#b91c1c;font-weight:600;">DELETE</span>

| Item | Nilai |
|---|---|
| Endpoint | `/api/casts/:id` |
| Deskripsi | Menghapus data cast berdasarkan UUID |
| Parameter | `id` |

### Contoh AJAX jQuery

```html
<script>
  function deleteCast(castId) {
    $.ajax({
      url: "http://localhost:5000/api/casts/" + castId,
      method: "DELETE",
      success: function (response) {
        console.log("Berhasil menghapus cast:", response);
      },
      error: function (xhr, status, error) {
        console.error("Gagal menghapus cast:", error);
      }
    });
  }

  deleteCast("uuid-cast-di-sini");
</script>
```
