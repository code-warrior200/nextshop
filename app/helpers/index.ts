// Helper function to create a fetch with timeout
const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout: number = 8000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error: any) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error('Request timeout');
        }
        throw error;
    }
};

// Transform DummyJSON product to our ProductType
const transformProduct = (product: any, category: string) => {
    return {
        _id: product.id,
        title: product.title,
        description: product.description || `${product.title} - High quality product`,
        image: product.images && product.images.length > 0 ? product.images[0] : product.thumbnail,
        price: product.price,
        previousPrice: Math.round(product.price * 1.2), // Add 20% to show discount
        isNew: product.rating >= 4.5,
        brand: product.brand || 'Brand',
        category: category,
        quantity: product.stock || 100,
    };
};

// Fetch all products from DummyJSON
export const getProducts = async () => {
    try {
        const res = await fetchWithTimeout("https://dummyjson.com/products?limit=100",
            {
                next: { revalidate: 3600 }
            },
            8000
        );
        if(!res.ok){
            throw new Error ("Failed to fetch products")
        }
        const data = await res.json();
        // Transform products to match our format
        const transformedProducts = data.products.map((product: any) => 
            transformProduct(product, product.category || 'accessories')
        );
        return transformedProducts;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export const getPhones = async () => {
    try {
        // Using smartphones category from DummyJSON
        const res = await fetchWithTimeout("https://dummyjson.com/products/category/smartphones",
            {
                next: { revalidate: 3600 }
            },
            8000
        );
        if(!res.ok){
            throw new Error ("Failed to fetch Phones")
        }
        const data = await res.json();
        return data.products.map((product: any) => transformProduct(product, 'phone'));
    } catch (error) {
        console.error('Error fetching phones:', error);
        return [];
    }
};

export const getPhoneCases = async () => {
    try {
        // Using mobile accessories - if not available, use smartphones and modify
        const res = await fetchWithTimeout("https://dummyjson.com/products?limit=30",
            {
                next: { revalidate: 3600 }
            },
            8000
        );
        if(!res.ok){
            throw new Error ("Failed to fetch Phone cases")
        }
        const data = await res.json();
        // Filter for phone cases or use smartphones as phone accessories
        const phoneCases = data.products
            .filter((p: any) => p.category === 'smartphones' || p.category === 'mobile-accessories')
            .slice(0, 20)
            .map((product: any) => ({
                ...transformProduct(product, 'phone case'),
                title: `${product.title} Case`,
                description: `Protective case for ${product.title}`,
            }));
        return phoneCases.length > 0 ? phoneCases : data.products.slice(0, 20).map((p: any) => transformProduct(p, 'phone case'));
    } catch (error) {
        console.error('Error fetching phone cases:', error);
        return [];
    }
};

export const getWatches = async () => {
    try {
        // Using mens-watches or womens-watches category, fallback to all products
        const res = await fetchWithTimeout("https://dummyjson.com/products?limit=100",
            {
                next: { revalidate: 3600 }
            },
            8000
        );
        if(!res.ok){
            throw new Error ("Failed to fetch Watches")
        }
        const data = await res.json();
        // Filter for watches only
        const watches = data.products
            .filter((p: any) => 
                p.category.includes('watch') || 
                p.category === 'mens-watches' || 
                p.category === 'womens-watches' ||
                p.title.toLowerCase().includes('watch')
            )
            .slice(0, 30)
            .map((product: any) => transformProduct(product, 'watch'));
        
        // If no watches found, create some from available products
        if (watches.length === 0) {
            return data.products.slice(0, 20).map((p: any) => ({
                ...transformProduct(p, 'watch'),
                title: `${p.brand || 'Smart'} Watch`,
            }));
        }
        return watches;
    } catch (error) {
        console.error('Error fetching watches:', error);
        return [];
    }
};

export const getFragrances = async () => {
    try {
        // Fetch fragrances category from DummyJSON
        const res = await fetchWithTimeout("https://dummyjson.com/products/category/fragrances",
            {
                next: { revalidate: 3600 }
            },
            8000
        );
        if(!res.ok){
            throw new Error ("Failed to fetch Fragrances")
        }
        const data = await res.json();
        // Transform fragrances to match our format
        const fragrances = data.products.map((product: any) => transformProduct(product, 'fragrance'));
        
        // If no fragrances found, try fallback
        if (fragrances.length === 0) {
            const fallbackRes = await fetchWithTimeout("https://dummyjson.com/products?limit=100",
                {
                    next: { revalidate: 3600 }
                },
                8000
            );
            if(fallbackRes.ok) {
                const fallbackData = await fallbackRes.json();
                return fallbackData.products
                    .filter((p: any) => 
                        p.category === 'fragrances' ||
                        p.title.toLowerCase().includes('perfume') ||
                        p.title.toLowerCase().includes('fragrance')
                    )
                    .slice(0, 30)
                    .map((product: any) => transformProduct(product, 'fragrance'));
            }
        }
        return fragrances;
    } catch (error) {
        console.error('Error fetching fragrances:', error);
        return [];
    }
};

export const getAccessories = async () => {
    try {
        // Use various accessory categories from DummyJSON
        const categories = ['home-decoration', 'fragrances', 'skincare', 'groceries', 'furniture'];
        const allProducts = [];
        
        // Fetch from multiple categories
        for (const category of categories.slice(0, 3)) {
            try {
                const res = await fetchWithTimeout(`https://dummyjson.com/products/category/${category}`,
                    {
                        next: { revalidate: 3600 }
                    },
                    5000
                );
                if(res.ok) {
                    const data = await res.json();
                    allProducts.push(...data.products);
                }
            } catch (err) {
                // Continue with next category if one fails
                continue;
            }
        }
        
        // If no products from categories, get general products
        if (allProducts.length === 0) {
            const res = await fetchWithTimeout("https://dummyjson.com/products?limit=50",
                {
                    next: { revalidate: 3600 }
                },
                8000
            );
            if(res.ok) {
                const data = await res.json();
                allProducts.push(...data.products);
            }
        }
        
        return allProducts.slice(0, 40).map((product: any) => transformProduct(product, 'accessories'));
    } catch (error) {
        console.error('Error fetching accessories:', error);
        return [];
    }
};

// AliExpress Categories
export const getHomeGarden = async () => {
    try {
        const categories = ['home-decoration', 'furniture', 'groceries'];
        const allProducts = [];
        
        for (const category of categories) {
            try {
                const res = await fetchWithTimeout(`https://dummyjson.com/products/category/${category}`,
                    { next: { revalidate: 3600 } },
                    5000
                );
                if(res.ok) {
                    const data = await res.json();
                    allProducts.push(...data.products);
                }
            } catch (err) {
                continue;
            }
        }
        
        if (allProducts.length === 0) {
            const res = await fetchWithTimeout("https://dummyjson.com/products?limit=50",
                { next: { revalidate: 3600 } },
                8000
            );
            if(res.ok) {
                const data = await res.json();
                allProducts.push(...data.products);
            }
        }
        
        return allProducts.slice(0, 30).map((product: any) => transformProduct(product, 'home-garden'));
    } catch (error) {
        console.error('Error fetching home & garden:', error);
        return [];
    }
};

export const getConsumerElectronics = async () => {
    try {
        const res = await fetchWithTimeout("https://dummyjson.com/products/category/smartphones",
            { next: { revalidate: 3600 } },
            8000
        );
        if(!res.ok) {
            throw new Error("Failed to fetch Consumer Electronics");
        }
        const data = await res.json();
        return data.products.map((product: any) => transformProduct(product, 'consumer-electronics'));
    } catch (error) {
        console.error('Error fetching consumer electronics:', error);
        return [];
    }
};

export const getFashionApparel = async () => {
    try {
        const categories = ['mens-shirts', 'womens-dresses', 'womens-shoes', 'mens-shoes'];
        const allProducts = [];
        
        for (const category of categories.slice(0, 2)) {
            try {
                const res = await fetchWithTimeout(`https://dummyjson.com/products/category/${category}`,
                    { next: { revalidate: 3600 } },
                    5000
                );
                if(res.ok) {
                    const data = await res.json();
                    allProducts.push(...data.products);
                }
            } catch (err) {
                continue;
            }
        }
        
        if (allProducts.length === 0) {
            const res = await fetchWithTimeout("https://dummyjson.com/products?limit=50",
                { next: { revalidate: 3600 } },
                8000
            );
            if(res.ok) {
                const data = await res.json();
                allProducts.push(...data.products);
            }
        }
        
        return allProducts.slice(0, 30).map((product: any) => transformProduct(product, 'fashion-apparel'));
    } catch (error) {
        console.error('Error fetching fashion & apparel:', error);
        return [];
    }
};

export const getBeautyHealth = async () => {
    try {
        const categories = ['fragrances', 'skincare'];
        const allProducts = [];
        
        for (const category of categories) {
            try {
                const res = await fetchWithTimeout(`https://dummyjson.com/products/category/${category}`,
                    { next: { revalidate: 3600 } },
                    5000
                );
                if(res.ok) {
                    const data = await res.json();
                    allProducts.push(...data.products);
                }
            } catch (err) {
                continue;
            }
        }
        
        if (allProducts.length === 0) {
            const res = await fetchWithTimeout("https://dummyjson.com/products?limit=50",
                { next: { revalidate: 3600 } },
                8000
            );
            if(res.ok) {
                const data = await res.json();
                allProducts.push(...data.products);
            }
        }
        
        return allProducts.slice(0, 30).map((product: any) => transformProduct(product, 'beauty-health'));
    } catch (error) {
        console.error('Error fetching beauty & health:', error);
        return [];
    }
};

export const getAutomobiles = async () => {
    try {
        const res = await fetchWithTimeout("https://dummyjson.com/products?limit=100",
            { next: { revalidate: 3600 } },
            8000
        );
        if(!res.ok) {
            throw new Error("Failed to fetch Automobiles");
        }
        const data = await res.json();
        // Filter for automotive-related products
        const automotive = data.products
            .filter((p: any) => 
                p.title.toLowerCase().includes('car') ||
                p.title.toLowerCase().includes('auto') ||
                p.title.toLowerCase().includes('motor') ||
                p.category === 'automotive'
            )
            .slice(0, 30);
        
        if (automotive.length === 0) {
            return data.products.slice(0, 20).map((p: any) => transformProduct(p, 'automobiles'));
        }
        
        return automotive.map((product: any) => transformProduct(product, 'automobiles'));
    } catch (error) {
        console.error('Error fetching automobiles:', error);
        return [];
    }
};

export const getSportsEntertainment = async () => {
    try {
        const res = await fetchWithTimeout("https://dummyjson.com/products?limit=100",
            { next: { revalidate: 3600 } },
            8000
        );
        if(!res.ok) {
            throw new Error("Failed to fetch Sports & Entertainment");
        }
        const data = await res.json();
        // Filter for sports/entertainment products
        const sports = data.products
            .filter((p: any) => 
                p.title.toLowerCase().includes('sport') ||
                p.title.toLowerCase().includes('fitness') ||
                p.title.toLowerCase().includes('game') ||
                p.category === 'sports'
            )
            .slice(0, 30);
        
        if (sports.length === 0) {
            return data.products.slice(0, 20).map((p: any) => transformProduct(p, 'sports-entertainment'));
        }
        
        return sports.map((product: any) => transformProduct(product, 'sports-entertainment'));
    } catch (error) {
        console.error('Error fetching sports & entertainment:', error);
        return [];
    }
};

export const getToysHobbies = async () => {
    try {
        const res = await fetchWithTimeout("https://dummyjson.com/products?limit=100",
            { next: { revalidate: 3600 } },
            8000
        );
        if(!res.ok) {
            throw new Error("Failed to fetch Toys & Hobbies");
        }
        const data = await res.json();
        // Filter for toys/hobbies products
        const toys = data.products
            .filter((p: any) => 
                p.title.toLowerCase().includes('toy') ||
                p.title.toLowerCase().includes('game') ||
                p.category === 'toys'
            )
            .slice(0, 30);
        
        if (toys.length === 0) {
            return data.products.slice(0, 20).map((p: any) => transformProduct(p, 'toys-hobbies'));
        }
        
        return toys.map((product: any) => transformProduct(product, 'toys-hobbies'));
    } catch (error) {
        console.error('Error fetching toys & hobbies:', error);
        return [];
    }
};

export const getHealthHousehold = async () => {
    try {
        const categories = ['skincare', 'groceries', 'fragrances'];
        const allProducts = [];
        
        for (const category of categories) {
            try {
                const res = await fetchWithTimeout(`https://dummyjson.com/products/category/${category}`,
                    { next: { revalidate: 3600 } },
                    5000
                );
                if(res.ok) {
                    const data = await res.json();
                    allProducts.push(...data.products);
                }
            } catch (err) {
                continue;
            }
        }
        
        if (allProducts.length === 0) {
            const res = await fetchWithTimeout("https://dummyjson.com/products?limit=50",
                { next: { revalidate: 3600 } },
                8000
            );
            if(res.ok) {
                const data = await res.json();
                allProducts.push(...data.products);
            }
        }
        
        return allProducts.slice(0, 30).map((product: any) => transformProduct(product, 'health-household'));
    } catch (error) {
        console.error('Error fetching health & household:', error);
        return [];
    }
};