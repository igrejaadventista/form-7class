import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const formData = await req.json();

    console.log('Sending request to webhook:', {
      url: 'https://autoflow.adv.st/webhook/7class',
      data: formData,
    });

    const response = await fetch('https://autoflow.adv.st/webhook/7class', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': '7Class-Form/1.0',
      },
      body: JSON.stringify(formData),
    });

    console.log('Webhook response status:', response.status);

    // Try to parse response as JSON, fallback to text if not JSON
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.log('Non-JSON response:', text);
      data = { message: text };
    }

    if (!response.ok) {
      console.error('Webhook error:', {
        status: response.status,
        data,
      });
      throw new Error(`Webhook failed with status ${response.status}`);
    }

    return new Response(JSON.stringify({
      success: true,
      data,
    }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in webhook proxy:', error);

    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      details: 'An error occurred while processing your request',
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  }
});